import React, { Component } from 'react';
import '../css/style.css';
import Joke from './Joke';
import JokeList from './JokeList';


class App extends Component {
  constructor() {
    super();

    this.loadRandomJokes = this.loadRandomJokes.bind(this);
    this.loadBestJokes = this.loadBestJokes.bind(this);
    this.loadWorstJokes = this.loadWorstJokes.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);

    // getinitialState
    this.state = {
      jokes: {},
      bestjokes: {},
      worstjokes: {}
    };
  }

  componentDidMount() {
    this.loadRandomJokes();
    this.loadBestJokes();
    this.loadWorstJokes();
  }

  loadRandomJokes() {
    fetch('http://shnraj.pythonanywhere.com/jokes/20')
    .then(results  => results.json())
    .then(data => this.setState({ jokes: data }));
  }

  loadBestJokes() {
    fetch('http://shnraj.pythonanywhere.com/jokes/best/5')
    .then(results  => results.json())
    .then(data => this.setState({ bestjokes: data }));
  }

  loadWorstJokes() {
    fetch('http://shnraj.pythonanywhere.com/jokes/worst/5')
    .then(results  => results.json())
    .then(data => this.setState({ worstjokes: data }));
  }

  updateJokeCount(jokeId, offset) {
    // take a copy of the state
    const jokes = {...this.state.jokes};
    const bestjokes = {...this.state.bestjokes};
    const worstjokes = {...this.state.worstjokes};

    if (jokeId in jokes) {
      jokes[jokeId].votes = jokes[jokeId].votes + offset;
      this.setState({ jokes });
    }
    if (jokeId in bestjokes) {
      bestjokes[jokeId].votes = bestjokes[jokeId].votes + offset;
      this.setState({ bestjokes });
    }
    if (jokeId in worstjokes) {
      worstjokes[jokeId].votes = worstjokes[jokeId].votes + offset;
      this.setState({ worstjokes });
    }
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
        <div className="content">
          <div className="random-jokes joke-column">
            <div className="column-header">
              <h3> Rate These Random Jokes </h3>
              <button className="refresh" onClick={() => this.loadRandomJokes()}> Refresh </button>
            </div>
            <JokeList jokes={this.state.jokes} handleUpvote={this.handleUpvote} handleDownvote={this.handleDownvote}/>
          </div>
          <div className="best-jokes joke-column">
            <div className="column-header">
              <h3> Top 5 Best Jokes :) </h3>
              <button className="refresh" onClick={() => this.loadBestJokes()}> Refresh </button>
            </div>
            <JokeList jokes={this.state.bestjokes} handleUpvote={this.handleUpvote} handleDownvote={this.handleDownvote}/>
          </div>
          <div className="worst-jokes joke-column">
            <div className="column-header">
              <h3> Top 5 Worst Jokes :( </h3>
              <button className="refresh" onClick={() => this.loadWorstJokes()}> Refresh </button>
            </div>
            <JokeList jokes={this.state.worstjokes} handleUpvote={this.handleUpvote} handleDownvote={this.handleDownvote}/>            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
