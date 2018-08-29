import React from 'react';
import PropTypes from 'prop-types';
import './hup.css';

class Hup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: this.props.size,
      drops: this.props.drops,
    };

    this.add = this.add.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  add() {
    if (this.state.size <= this.state.drops) {
      return;
    }

    this.setState(prevState => ({ drops: prevState.drops + 1 }));
  }

  decrease() {
    if (this.state.drops <= 0) {
      return;
    }

    this.setState(prevState => ({ drops: prevState.drops - 1 }));
  }

  render() {
    const { size, drops } = this.state;

    return (
      <>
        <div className="hup">
          {`${drops}/${size}`}
        </div>
        <button type="button" onClick={this.add} disabled={drops >= size}>Add</button>
        <button type="button" onClick={this.decrease} disabled={drops <= 0}>Decrease</button>
      </>
    );
  }
}

Hup.propTypes = {
  size: PropTypes.number.isRequired,
  drops: PropTypes.number.isRequired,
};

export default Hup;
