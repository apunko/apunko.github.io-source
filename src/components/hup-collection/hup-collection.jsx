import React from 'react';
import Hup from '../hup';
import HupForm from './hup-form';

class HupCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hups: [],
    };

    this.addHup = this.addHup.bind(this);
  }

  addHup(hup) {
    this.setState(prevState => (
      { hups: [...prevState.hups, { ...hup, drops: 0 }] }
    ));
  }

  render() {
    const hups = this.state.hups.map(hup => (
      <Hup key={hup.title} size={hup.size} drops={hup.drops} />
    ));

    return (
      <>
        <h2>Hups</h2>
        {hups}
        <HupForm addHup={this.addHup} />
      </>
    );
  }
}

export default HupCollection;
