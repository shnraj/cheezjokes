import React, { Component } from 'react';
import '../css/style.css';
import Joke from './Joke';

class App extends Component {
  constructor() {
    super();

    // this.addFish = this.addFish.bind(this);
    this.reloadJokes = this.reloadJokes.bind(this);

    // getinitialState
    this.state = {
      jokes: {},
    };
  }

  componentDidMount() {
    this.reloadJokes();
  }

  reloadJokes() {
    fetch('http://shnraj.pythonanywhere.com/jokes/20')
    .then(results  => results.json())
    .then(data => this.setState({ jokes: data }));
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">CheezJokes</h1>
          <p className="app-intro">
            Upvote and downvote your favorite jokes!
          </p>
        </header>
        <div className="random-jokes">
          <ul className="list-of-jokes">
            {
              Object
                .keys(this.state.jokes)
                .map(key => <Joke key={key} id={key} text={this.state.jokes[key].joke} count={this.state.jokes[key].votes} />)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
