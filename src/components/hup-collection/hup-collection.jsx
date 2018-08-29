import React from 'react';
import PropTypes from 'prop-types';
import Hup from '../hup';
import HupForm from './hup-form';
import Firebase from '../../services/firebase';

class HupCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hups: [] };

    Firebase.hupsRef(this.props.userEmail).get()
      .then((querySnapshot) => {
        const hups = [];
        querySnapshot.forEach((doc) => {
          hups.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        this.setState({ hups });
      })
      .catch((error) => {
        console.log(error);
      });

    this.addHup = this.addHup.bind(this);
  }

  addHup(hup) {
    this.setState(prevState => (
      { hups: [...prevState.hups, { ...hup, drops: 0 }] }
    ));
  }

  render() {
    const hups = this.state.hups.map(hup => (
      <Hup key={hup.id} size={hup.size} drops={hup.drops} />
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

HupCollection.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default HupCollection;
