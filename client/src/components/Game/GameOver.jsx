import React from 'react';

import axios from 'axios';

class GameOver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      leaderboard: [],
      position: null,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.getLeaderboard = this.getLeaderboard.bind(this);
  }

  componentDidMount() {
    this.getLeaderboard();
  }

  getLeaderboard() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/leaderboard'
    })
      .then(response => {
        this.setState({
          leaderboard: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  submitScore() {
    if (this.state.submitted) {
      return;
    }
    if (this.state.name === '') {
      alert('Please enter a name.');
      return;
    }
    var data = {
      name: this.state.name,
      score: Math.floor(this.props.score)
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3000/leaderboard',
      data: data
    })
      .then(response => {
        this.setState({
          submitted: true,
          leaderboard: response.data.leaderboard,
          position: <div>{`${response.data.position}. ${this.state.name} ${Math.floor(this.props.score)}`}</div>
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var i = 1;
    return (
      <div id="gameover-modal">
        <div className="gameover">Game Over</div>
        <div className="gameover">Leaderboard</div>
        {this.state.leaderboard.map(entry => {
          return (
            <div>
              <span>{`${i++}. `}</span>
              <span>{`${entry.name} ${entry.score}`}</span>
            </div>
          )
        })}
        <br/>
        {this.state.position}
        <div>Score: {Math.floor(this.props.score)}</div>
        <label htmlFor="name" className="name">
          Name:
          <input type="text" className="name" name="name" onChange={this.handleChange}></input>
        </label>
        <button onClick={this.submitScore}>Submit Score</button>
        <button onClick={this.props.reset}>Play Again</button>
      </div>
    );
  }
};

export default GameOver;