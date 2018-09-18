import React from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  size: 100,
  title: '',
  dropValue: '',
};

class HupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.addHup({ ...this.state, size: Number(this.state.size) });
    this.setState(defaultState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          Title:
          <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label htmlFor="dropValue">
          One drop value:
          <input name="dropValue" type="text" value={this.state.dropValue} onChange={this.handleChange} />
        </label>
        <label htmlFor="size">
          Size:
          <input name="size" type="number" value={this.state.size} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

HupForm.propTypes = {
  addHup: PropTypes.func.isRequired,
};

export default HupForm;
