import React from 'react';

class Joke extends React.Component {
  render() {
    const { id, joke, votes } = this.props;
    const isAvailable = true;
    // const isAvailable = details.status === 'available';
    // const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <div className="joke">
        <div className="counter">
            <button onClick={() => this.props.handleUpvote(id)} disabled={!isAvailable}>+</button>
            <h2 className="count">{votes}</h2>
            <button onClick={() => this.props.handleDownvote(id)} disabled={!isAvailable}>-</button>
        </div>
        <div className="text">
          <p>{joke}</p>
        </div>
      </div>
    )
  }
}

export default Joke;
