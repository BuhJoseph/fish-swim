import React from 'react';

class Obstacle extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    var player = this.props.playerPos;
    var obstacle = this.props.position;

    var style = {};
    for (var key in obstacle) {
      style[key] = obstacle[key];
    }

    if (player.left <= obstacle.left + 50 &&
      player.left + 50 >= obstacle.left &&
      player.top <= obstacle.top + 50 &&
      player.top + 50 >= obstacle.top) {
      style.backgroundColor = 'red';
    } else {
      style.backgroundColor = 'transparent';
    }

    style.top = style.top + 'px';
    style.left = style.left + 'px';

    return (
      <div className="obstacle" style={style}>

      </div>
    );
  }
}

export default Obstacle;