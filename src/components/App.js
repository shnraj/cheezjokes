import React, { Component } from 'react';
import '../css/style.css';
import Joke from './Joke';

class App extends Component {
  constructor() {
    super();

    this.reloadJokes = this.reloadJokes.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);

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

  updateJokeCount(jokeId, offset) {
    // take a copy of our state
    const jokes = {...this.state.jokes};
    // update or add the new number of fish ordered
    jokes[jokeId].votes = jokes[jokeId].votes + offset;
    // update our state
    this.setState({ jokes });
  }

  vote(url, jokeId) {
    fetch(url + '"' + jokeId + '"', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  handleUpvote(jokeId) {
    this.vote('http://shnraj.pythonanywhere.com/joke/upvote/', jokeId)
    this.updateJokeCount(jokeId, 1);
  }

  handleDownvote(jokeId) {
    this.vote('http://shnraj.pythonanywhere.com/joke/downvote/', jokeId)
    this.updateJokeCount(jokeId, -1);
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
                .map(key => 
                  <Joke 
                    key={key} 
                    id={key} 
                    joke={this.state.jokes[key].joke} 
                    votes={this.state.jokes[key].votes} 
                    handleUpvote={this.handleUpvote}
                    handleDownvote={this.handleDownvote}
                  />
                )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
