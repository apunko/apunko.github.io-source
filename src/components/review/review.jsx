import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import './review.css';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.toggleReview = this.toggleReview.bind(this);
  }

  toggleReview() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  render() {
    return (
      <div>
        <div>
          <span className="review-title">{this.props.title}</span>
          <button type="button" onClick={this.toggleReview}>
            Toggle review
          </button>
        </div>
        {this.state.open && <Markdown>{this.props.html}</Markdown>}
      </div>
    );
  }
}

Review.propTypes = {
  title: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};

export default Review;
