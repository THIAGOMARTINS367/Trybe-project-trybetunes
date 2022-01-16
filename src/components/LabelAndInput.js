import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LabelAndInput extends Component {
  render() {
    const {
      labelContent,
      inputType,
      inputName,
      inputValue,
      inputID,
      placeholderContent,
      onChangeEvent,
      dataTestId,
    } = this.props;
    return (
      <section>
        <label htmlFor={ inputID }>{ labelContent }</label>
        <br />
        <input
          type={ inputType }
          name={ inputName }
          value={ inputValue }
          id={ inputID }
          placeholder={ placeholderContent }
          onChange={ onChangeEvent }
          data-testid={ dataTestId }
        />
      </section>
    );
  }
}

LabelAndInput.propTypes = {
  labelContent: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  inputID: PropTypes.string.isRequired,
  placeholderContent: PropTypes.string,
  onChangeEvent: PropTypes.func,
  dataTestId: PropTypes.string.isRequired,
};

LabelAndInput.defaultProps = {
  inputName: '',
  placeholderContent: '',
  onChangeEvent: () => '',
};

export default LabelAndInput;
