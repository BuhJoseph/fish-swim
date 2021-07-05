import React from 'react';

import Window from './Game/Window.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Window />
      </div>
    );
  };
}

export default App;