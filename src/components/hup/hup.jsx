import React from 'react';
import PropTypes from 'prop-types';
import './hup.css';

class Hup extends React.Component {
  render() {
    const {
      size, drops, id, title, dropValue,
    } = this.props;

    return (
      <>
        <div className="hup">
          {`${title} |${dropValue}| - ${drops}/${size}`}
        </div>
        <button type="button" id={id} onClick={this.props.onDrop} disabled={drops >= size}>Add</button>
        <button type="button" id={id} onClick={this.props.onPickUp} disabled={drops <= 0}>Decrease</button>
        <button type="button" id={id} onClick={this.props.onSave}>Save</button>
        <button type="button" id={id} onClick={this.props.onDelete}>Delete</button>
      </>
    );
  }
}

Hup.propTypes = {
  size: PropTypes.number.isRequired,
  drops: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  dropValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onPickUp: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Hup;
