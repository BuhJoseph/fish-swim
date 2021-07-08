import React from 'react';

const Background = props => {
  var position = {
    left: props.background.left + 'px'
  }
  return (
    <div className="background" id={`bg${props.background.id}`} style={position}></div>
  );
}

export default Background;