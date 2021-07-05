import React from 'react';

import Player from './Player.jsx';
import Obstacle from './Obstacle.jsx';

class Window extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alive: true,
      playerPos: {
        top: 300,
        left: 175
      },
      obstacles: [],
      prevObstacle: Math.floor(Math.random() * 3),
      xVel: 5,
    }

    this.handleKeydown = this.handleKeydown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.generateObstacles = this.generateObstacles.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    this.moveLeft();
    this.generateObstacles();
  }

  moveLeft() {
    var obstacles = this.state.obstacles;
    for (var i = 0; i < obstacles.length;) {
      obstacles[i].left = obstacles[i].left - this.state.xVel;
      if (obstacles[i].left < -50) {
        obstacles.splice(i, 1);
      } else {
        i++;
      }
    }
    this.setState({
      obstacles: this.state.obstacles
    });
    if (this.state.alive) {
      setTimeout(this.moveLeft, 33);
    }
  }


  generateObstacles() {
    var obstacles = [
      [
        {
          top: 300,
          left: 1050
        },
        {
          top: 450,
          left: 1050
        }
      ],
      [
        {
          top: 150,
          left: 1050
        },
        {
          top: 450,
          left: 1050
        }
      ],
      [
        {
          top: 150,
          left: 1050
        },
        {
          top: 300,
          left: 1050
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
      setTimeout(this.generateObstacles, 1500);
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


  render() {
    return (
      <div id="position-window">
        <div className="window">
          <div id="lane0"></div>
          <div id="lane1"></div>
          <div id="lane2"></div>
          <Player position={this.state.playerPos}/>
          {this.state.obstacles.map(obstacle => {
            return <Obstacle position={obstacle} playerPos={this.state.playerPos} />
          })}
        </div>
      </div>
    );
  }
}

export default Window;