import React, { Component } from 'react';

class GenericButton extends Component {
  render() {
    const { buttonContent, onClickEvent, dataTestId } = this.props;
    return (
      <button type="button" onClick={ onClickEvent } data-testid={ dataTestId }>
        { buttonContent }
      </button>
    );
  }
}

export default GenericButton;
