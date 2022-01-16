import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LabelAndCheckbox extends Component {
  render() {
    const {
      labelContent,
      inputName,
      inputID,
      onChangeEvent,
      dataTestId,
    } = this.props;
    return (
      <section>
        <label htmlFor={ inputID }>
          <input
            type="checkbox"
            name={ inputName }
            id={ inputID }
            onChange={ onChangeEvent }
            data-testid={ dataTestId }
          />
          { labelContent }
        </label>
      </section>
    );
  }
}

LabelAndCheckbox.propTypes = {
  labelContent: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputID: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default LabelAndCheckbox;
