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
    const {
      title, author, link, date, html,
    } = this.props;

    return (
      <div className="review">
        <div>
          <span className="review-title">
            {title} <i>by {author}</i>
          </span>
          <button type="button" onClick={this.toggleReview}>
            Toggle review
          </button>
        </div>
        {this.state.open
          && (
          <div>
            <a href={link} rel="noopener noreferrer" target="_blank">Link to the book</a>
            <Markdown>{html}</Markdown>
            <div className="created-date">
              {date}
            </div>
          </div>)
        }
      </div>
    );
  }
}

Review.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};

export default Review;
