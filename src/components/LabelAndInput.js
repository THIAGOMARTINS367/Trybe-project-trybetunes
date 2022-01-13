import React, { Component } from 'react';

class LabelAndInput extends Component {
  render() {
    const {
      labelContent,
      inputType,
      inputName,
      inputValue,
      inputID,
      onChangeEvent,
      dataTestId,
    } = this.props;
    return (
      <section>
        <label htmlFor={ inputID }>{ labelContent }</label>
        <input
          type={ inputType }
          name={ inputName }
          value={ inputValue }
          id={ inputID }
          onChange={ onChangeEvent }
          data-testid={ dataTestId }
        />
      </section>
    );
  }
}

export default LabelAndInput;
