import React from 'react';

class Joke extends React.Component {
  render() {
    const { id, joke, votes } = this.props;
    return (
      <div className="joke">
        <div className="counter">
            <button onClick={() => this.props.handleUpvote(id)}>+</button>
            <h2 className="count">{votes}</h2>
            <button onClick={() => this.props.handleDownvote(id)}>-</button>
        </div>
        <div className="text">
          <p>{joke}</p>
        </div>
      </div>
    )
  }
}

export default Joke;
