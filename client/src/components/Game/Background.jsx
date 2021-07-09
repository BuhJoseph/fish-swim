import React from 'react';

const Background = props => {
  var position = {
    left: props.background.left + 'px'
  }
  return (
    <div className="background" style={position}>
      <img src={`../../../assets/background${props.background.id + 1}.png`}></img>
    </div>
  );
}

export default Background;