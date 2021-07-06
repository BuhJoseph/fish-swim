import React from 'react';

const GameOver = props => {
  return (
    <div id="gameover">
      <div>Game Over</div>
      <div>Score: {Math.floor(props.score)}</div>
      <button onClick={props.reset}>Play Again</button>
    </div>
  );
};

export default GameOver;