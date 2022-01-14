import React, { Component } from 'react';

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
        <label htmlFor={ inputID }>{ labelContent }</label> <br />
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

export default LabelAndInput;
