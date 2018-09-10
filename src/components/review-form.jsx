import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from './markdown-editor';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mdeState: null,
    };

    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleMarkdownChange(mdeState) {
    this.setState({ mdeState });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
        <h2>Add new review:</h2>
        <form>
          <label htmlFor="title">
            Title:
            <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
          </label>
          <label htmlFor="url">
            Url:
            <input type="text" name="url" onChange={this.handleChange} value={this.state.url} />
          </label>
          <MarkdownEditor value={this.state.mdeState} handleChange={this.handleMarkdownChange} />
        </form>
      </>
    );
  }
}

ReviewForm.propTypes = {
  review: PropTypes.shape({
    mdeState: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ReviewForm;
