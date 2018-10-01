import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from '../markdown-editor';
import './review-form.scss';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mdeState: null,
    };

    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleMarkdownChange(mdeState) {
    this.setState({ mdeState });
  }

  handleSave() {
    this.props.handleSave({
      markdown: this.state.mdeState.markdown,
    });
  }

  render() {
    return (
      <div>
        <h2>Add new review:</h2>
        <div>
          <MarkdownEditor value={this.state.mdeState} handleChange={this.handleMarkdownChange} />
          <button className="save-review" type="button" onClick={this.handleSave}>Save</button>
        </div>
      </div>
    );
  }
}

ReviewForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
};

export default ReviewForm;
