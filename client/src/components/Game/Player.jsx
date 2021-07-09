import React from 'react';

const Player = props => {
  var position = {};
  for (var key in props.position) {
    position[key] = props.position[key];
  }
  position.top = position.top + 'px';
  position.left = position.left + 'px';
  return (
    <div id={props.alive ? 'player' : null} style={position}></div>
  );
};




export default Player;