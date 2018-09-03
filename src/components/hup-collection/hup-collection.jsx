import React from 'react';
import PropTypes from 'prop-types';
import Hup from '../hup';
import HupForm from './hup-form';
import HupsService from '../../services/hups-service';

class HupCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hups: [] };
    this.hupsService = new HupsService(this.props.userEmail);

    this.hupsService.getAll().then(hups => this.setState({ hups }));

    this.addHup = this.addHup.bind(this);
    this.onDrop = this.updateHup.bind(this, 1, hup => hup.size <= hup.drops);
    this.onPickUp = this.updateHup.bind(this, -1, hup => hup.drops <= 0);
    this.deleteHup = this.deleteHup.bind(this);
    this.saveHup = this.saveHup.bind(this);
  }

  addHup(hup) {
    this.hupsService.create({ ...hup, drops: 0 })
      .then((createdHup) => {
        this.setState(prevState => (
          { hups: [...prevState.hups, createdHup] }
        ));
      });
  }

  deleteHup(event) {
    const { id } = event.target;
    this.hupsService.destroy(id).then(() => {
      this.setState(prevState => (
        { hups: prevState.hups.filter(hup => hup.id !== id) }
      ));
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
    this.hupsService.update(id, { drops: hupForSave.drops });
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
        <HupForm addHup={this.addHup} />
        {hups}
      </>
    );
  }
}

HupCollection.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default HupCollection;
