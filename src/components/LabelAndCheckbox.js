import React, { Component } from 'react';

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

export default LabelAndCheckbox;