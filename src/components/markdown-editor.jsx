import React from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdeState: null,
    };
    this.converter = new Showdown.Converter({ tables: true, simplifiedAutoLink: true });
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(mdeState) {
    this.setState({ mdeState });
  }

  render() {
    return (
      <div className="container">
        <ReactMde
          onChange={this.handleValueChange}
          editorState={this.state.mdeState}
          generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
        />
      </div>
    );
  }
}

export default MarkdownEditor;
