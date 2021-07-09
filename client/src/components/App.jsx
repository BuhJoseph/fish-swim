import React from 'react';

import Window from './Game/Window.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="title">Fish Swim</div>
        <Window />
        <div id="controls">
          <div className="underline">Controls</div>
          <div>Up: ↑</div>
          <div>Down: ↓</div>
        </div>
      </div>
    );
  };
}

export default App;