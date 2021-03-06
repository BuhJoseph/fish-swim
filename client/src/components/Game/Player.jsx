import React from 'react';

const Player = props => {
  var position = {};
  for (var key in props.position) {
    position[key] = props.position[key];
  }
  position.top = position.top + 'px';
  position.left = position.left + 'px';
  return (
    <div id="player" style={position}>
      <img className="fish" src={`../../../assets/${props.alive ? 'fish.gif' : 'dead_fish.png'}`}></img>
    </div>
  );
};




export default Player;