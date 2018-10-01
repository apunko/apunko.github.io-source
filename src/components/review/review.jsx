import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import './review.scss';

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
      <div className="review">
        <div>
          <span className="review-title">
            {this.props.title} <i>by {this.props.author}</i>
          </span>
          <button type="button" onClick={this.toggleReview}>
            Toggle review
          </button>
        </div>
        {this.state.open
          && (
          <div>
            <a href={this.props.link} rel="noopener noreferrer" target="_blank">Link to the book</a>
            <Markdown>{this.props.html}</Markdown>
          </div>)
        }
      </div>
    );
  }
}

Review.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};

export default Review;
