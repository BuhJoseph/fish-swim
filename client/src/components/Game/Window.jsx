import React from 'react';

import Player from './Player.jsx';
import Obstacle from './Obstacle.jsx';
import GameOver from './GameOver.jsx';
import Background from './Background.jsx';

class Window extends React.Component {
  constructor(props) {
    super(props);

    //Changeable settings
    this.stages = [1, 1, 1, 1.1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
                   2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
                   3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
                   4, 4, 4, 4.1, 4.1, 4.1, 4.2, 4.2, 4.2, 4.2, 4.2,
                   4.3, 4.3, 4.3, 4.3, 4.4, 4.4, 4.4, 4.4, 4.4,
                   4.5];
    this.base = {
      //Base speed
      xVel: 5,

      //Obstacle spacing
      obstacleRate: 1000,

      stageRate: 2000
    }

    this.state = {
      stage: 30,
      alive: true,
      playerPos: {
        top: 300,
        left: 175
      },
      obstacles: [],
      prevObstacle: Math.floor(Math.random() * 3),
      score: 0,
      backgrounds: [
        {
          id: 0,
          left: 0
        },
        {
          id: 1,
          left: 1300
        }
      ]
    }

    this.handleKeydown = this.handleKeydown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.generateObstacles = this.generateObstacles.bind(this);
    this.incrementStage = this.incrementStage.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.reset = this.reset.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    this.startGame();
  }

  startGame() {
    this.moveLeft();
    this.generateObstacles();
    this.incrementStage();
  }

  moveLeft() {
    var obstacles = this.state.obstacles;
    var backgrounds = this.state.backgrounds
    var xVel = this.stages[this.state.stage] * this.base.xVel;

    for (var i = 0; i < backgrounds.length; i++) {
      backgrounds[i].left = backgrounds[i].left - xVel / 3;
      if (backgrounds[i].left < -1300) {
        backgrounds[i].left = 2600 + backgrounds[i].left;
        backgrounds[i].id = (backgrounds[i].id + 2) % 3;
      }
    }

    var pass = false;
    for (var i = 0; i < obstacles.length;) {
      obstacles[i].left = obstacles[i].left - xVel;
      if (obstacles[i].left < -50) {
        obstacles.splice(i, 1);
        pass = true;
      } else {
        i++;
      }
    }

    var state = {
      obstacles: this.state.obstacles,
      backgrounds: this.state.backgrounds
    };
    if (pass) {
      state.score = this.state.score + this.stages[this.state.stage];
    }
    this.setState(state);
    if (this.state.alive) {
      setTimeout(this.moveLeft, 16);
    }
  }


  generateObstacles() {
    var obstacles = [
      [
        {
          top: 300,
          left: 1350
        },
        {
          top: 450,
          left: 1350
        }
      ],
      [
        {
          top: 150,
          left: 1350
        },
        {
          top: 450,
          left: 1350
        }
      ],
      [
        {
          top: 150,
          left: 1350
        },
        {
          top: 300,
          left: 1350
        }
      ]
    ];

    if (this.state.prevObstacle === 0 || this.state.prevObstacle === 2) {
      obstacles[1].forEach(obstacle => {
        this.state.obstacles.push(obstacle);
      });
      this.setState({
        prevObstacle: 1,
        obstacles: this.state.obstacles
      });
    } else {
      var next;
      if (Math.random() < 0.5) {
        next = 0;
      } else {
        next = 2;
      }
      obstacles[next].forEach(obstacle => {
        this.state.obstacles.push(obstacle);
      });
      this.setState({
        prevObstacle: next,
        obstacles: this.state.obstacles
      });
    }

    if (this.state.alive) {
      var rate = this.base.obstacleRate / this.stages[this.state.stage];
      setTimeout(this.generateObstacles, rate);
    }
  }

  incrementStage() {
    if (this.state.stage < this.stages.length - 1) {
      this.setState({
        stage: this.state.stage + 1
      });
    }

    if (this.state.alive) {
      setTimeout(this.incrementStage, this.base.stageRate);
    }
  }

  handleKeydown(e) {
    if (!this.state.alive) {
      return;
    }
    switch(e.keyCode) {
      //Up arrow
      case 38:
        if (this.state.playerPos.top > 150) {
          this.setState({
            playerPos: {
              top: this.state.playerPos.top - 150,
              left: 175
            }
          });
        }
        break;
      //Down arrow
      case 40:
        if (this.state.playerPos.top < 450) {
          this.setState({
            playerPos: {
              top: this.state.playerPos.top + 150,
              left: 175
            }
          });
        }
      default:
        break;
    }
  }

  handleCollision() {
    if (this.state.alive) {
      this.setState({
        alive: false
      });
    }
  }

  renderModal() {
    if (!this.state.alive) {
      return <GameOver score={this.state.score} reset={this.reset}/>;
    }
  }

  reset() {
    this.setState({
      alive: true,
      stage: 0,
      score: 0,
      obstacles: [],
      prevObstacle: Math.floor(Math.random() * 3),
      playerPos: {
        top: 300,
        left: 175
      }
    }, () => {
      this.startGame();
    });
  }

  render() {
    return (
      <div id="position-window">
        <div className="window">
          {this.state.backgrounds.map(background => {
            return <Background background={background} />
          })}
          <Player position={this.state.playerPos} alive={this.state.alive}/>
          {this.state.obstacles.map(obstacle => {
            return <Obstacle position={obstacle} playerPos={this.state.playerPos} handleCollision={this.handleCollision}/>
          })}
        </div>
        <div id="score">Score: {Math.floor(this.state.score)}</div>
        <div id="speed">Speed: {this.stages[this.state.stage] * 10}</div>
        {this.renderModal()}
      </div>
    );
  }
}

export default Window;