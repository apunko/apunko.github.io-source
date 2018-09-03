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
    this.onDrop = this.updateHup.bind(this, 1, hup => hup.size <= hup.drops);
    this.onPickUp = this.updateHup.bind(this, -1, hup => hup.drops <= 0);
    this.deleteHup = this.deleteHup.bind(this);
    this.saveHup = this.saveHup.bind(this);
  }

  addHup(hup) {
    Firebase.hupsRef(this.props.userEmail)
      .add({ ...hup, drops: 0 })
      .then((docRef) => {
        this.setState(prevState => (
          { hups: [...prevState.hups, { ...hup, id: docRef.id, drops: 0 }] }
        ));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteHup(event) {
    const { id } = event.target;
    Firebase.hupsRef(this.props.userEmail).doc(id).delete()
      .then(() => {
        this.setState(prevState => (
          { hups: prevState.hups.filter(hup => hup.id !== id) }
        ));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateHup(value, shouldCancelUpdate, event) {
    const { id } = event.target;
    const hupForUpdate = this.state.hups.find(hup => hup.id === id);
    if (shouldCancelUpdate(hupForUpdate)) {
      return;
    }

    this.setState(prevState => (
      {
        hups: prevState.hups.map(hup => (
          hup.id === id ? { ...hup, drops: hup.drops + value } : hup
        )),
      }
    ));
  }

  saveHup(event) {
    const { id } = event.target;
    const hupForSave = this.state.hups.find(hup => hup.id === id);
    Firebase.hupsRef(this.props.userEmail).doc(id)
      .update({ drops: hupForSave.drops })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const hups = this.state.hups.map(hup => (
      <Hup
        {...hup}
        key={hup.id}
        onDrop={this.onDrop}
        onPickUp={this.onPickUp}
        onDelete={this.deleteHup}
        onSave={this.saveHup}
      />
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
