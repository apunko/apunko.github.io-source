import React from 'react';
import ReactMde from 'react-mde';
import PropTypes from 'prop-types';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    this.converter = new Showdown.Converter({ tables: true, simplifiedAutoLink: true });
  }

  render() {
    return (
      <div className="container">
        <ReactMde
          layout="horizontal"
          onChange={this.props.handleChange}
          editorState={this.props.value}
          generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
        />
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

MarkdownEditor.defaultProps = {
  value: null,
};

export default MarkdownEditor;
