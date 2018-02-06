import React, { Component } from 'react';
import '../css/style.css';
import Joke from './Joke';

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
    // take a copy of our state
    const jokes = {...this.state.jokes};
    const bestjokes = {...this.state.bestjokes};
    const worstjokes = {...this.state.worstjokes};
    // update count in joke list
    if (jokeId in jokes) {
      jokes[jokeId].votes = jokes[jokeId].votes + offset;
      // update our state
      this.setState({ jokes });
    }
    if (jokeId in bestjokes) {
      bestjokes[jokeId].votes = bestjokes[jokeId].votes + offset;
      // update our state
      this.setState({ bestjokes });
    }
    if (jokeId in worstjokes) {
      worstjokes[jokeId].votes = worstjokes[jokeId].votes + offset;
      // update our state
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
            <h3> Rate These Random Jokes </h3>
            <button onClick={() => this.loadRandomJokes()}> Refresh </button>
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
          <div className="best-jokes joke-column">
            <h3> Top 5 Best Jokes :) </h3>
            <button onClick={() => this.loadBestJokes()}> Refresh </button>
            <ul className="list-of-jokes">
              {
                Object
                  .keys(this.state.bestjokes)
                  .map(key => 
                    <Joke 
                      key={key} 
                      id={key} 
                      joke={this.state.bestjokes[key].joke} 
                      votes={this.state.bestjokes[key].votes} 
                      handleUpvote={this.handleUpvote}
                      handleDownvote={this.handleDownvote}
                    />
                  )
              }
            </ul>
          </div>
          <div className="worst-jokes joke-column">
            <h3> Top 5 Worst Jokes :( </h3>
              <button onClick={() => this.loadWorstJokes()}> Refresh </button>
            <ul className="list-of-jokes">
              {
                Object
                  .keys(this.state.worstjokes)
                  .map(key => 
                    <Joke 
                      key={key} 
                      id={key} 
                      joke={this.state.worstjokes[key].joke} 
                      votes={this.state.worstjokes[key].votes} 
                      handleUpvote={this.handleUpvote}
                      handleDownvote={this.handleDownvote}
                    />
                  )
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
