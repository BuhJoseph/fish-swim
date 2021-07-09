import React from 'react';

class Obstacle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alive: true,
      img: 'mine.png'
    }
  }
  render() {
    var player = this.props.playerPos;
    var obstacle = this.props.position;

    var style = {};
    for (var key in obstacle) {
      style[key] = obstacle[key];
    }

    if (player.left <= obstacle.left + 45 &&
      player.left + 50 >= obstacle.left &&
      player.top <= obstacle.top + 50 &&
      player.top + 50 >= obstacle.top &&
      this.state.alive) {
      this.props.handleCollision();
      this.setState({
        alive: false,
        img: 'explode.gif'
      });
    }

    style.top = style.top + 'px';
    style.left = style.left + 'px';

    return (
      <div className="obstacle" style={style}>
        <img src={`../../../assets/${this.state.img}`} className={this.state.alive ? 'obstacle' : 'explode'}></img>
      </div>
    );
  }
}

export default Obstacle;