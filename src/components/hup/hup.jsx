import React from 'react';
import './hup.css';

class Hup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 100,
      drops: 4,
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

export default Hup;
