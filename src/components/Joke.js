import React from 'react';

class Joke extends React.Component {
  render() {
    const { id, text, count } = this.props;
    const isAvailable = true;
    // const isAvailable = details.status === 'available';
    // const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <div className="joke">
        <div className="counter">
            <button onClick={() => this.props.handleUpvoteClick(id)} disabled={!isAvailable}>+</button>
            <h2 className="count">{count}</h2>
            <button onClick={() => this.props.handleDownvoteClick(id)} disabled={!isAvailable}>-</button>
        </div>
        <div className="text">
          <p>{text}</p>
        </div>
      </div>
    )
  }
}

export default Joke;
