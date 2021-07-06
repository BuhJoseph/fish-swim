import React from 'react';

import Player from './Player.jsx';
import Obstacle from './Obstacle.jsx';

class Window extends React.Component {
  constructor(props) {
    super(props);

    this.stages = [1, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.25, 4.5, 4.75, 5, 5.25];
    this.base = {
      xVel: 5,
      rate: 1200
    }

    this.state = {
      alive: true,
      playerPos: {
        top: 300,
        left: 175
      },
      obstacles: [],
      prevObstacle: Math.floor(Math.random() * 3),
      stage: 0,
      score: 0
    }

    this.handleKeydown = this.handleKeydown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.generateObstacles = this.generateObstacles.bind(this);
    this.incrementStage = this.incrementStage.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    this.moveLeft();
    this.generateObstacles();
    this.incrementStage();
  }

  moveLeft() {
    var obstacles = this.state.obstacles;
    var xVel = this.stages[this.state.stage] * this.base.xVel;
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
      obstacles: this.state.obstacles
    };
    if (pass) {
      state.score = this.state.score + Math.floor(10 * this.stages[this.state.stage]);
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
      var rate = this.base.rate / this.stages[this.state.stage];
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
      setTimeout(this.incrementStage, 5000);
    }
  }

  handleKeydown(e) {
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


  render() {
    return (
      <div id="position-window">
        <div className="window">
          {/* <div id="lane0"></div>
          <div id="lane1"></div>
          <div id="lane2"></div> */}
          <Player position={this.state.playerPos}/>
          {this.state.obstacles.map(obstacle => {
            return <Obstacle position={obstacle} playerPos={this.state.playerPos} handleCollision={this.handleCollision}/>
          })}
        </div>
        <div id="score">Score: {this.state.score}</div>
      </div>
    );
  }
}

export default Window;