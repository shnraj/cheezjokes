import React from 'react';
import Joke from './Joke';

class JokeList extends React.Component {
  render() {
    const { jokes } = this.props;
    return (
      <div>
        <ul className="list-of-jokes">
          { 
            Object
              .keys(jokes)
              .map(key => 
                <Joke 
                  key={key} 
                  id={key} 
                  joke={jokes[key].joke} 
                  votes={jokes[key].votes} 
                  handleUpvote={this.props.handleUpvote}
                  handleDownvote={this.props.handleDownvote} 
                />
            )
          }
        </ul>
      </div>
    )
  }
}

export default JokeList;
