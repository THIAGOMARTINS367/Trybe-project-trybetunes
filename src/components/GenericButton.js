import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const { buttonContent, onClickEvent, disabledButton, dataTestId } = this.props;
    return (
      <div>
        {
          disabledButton ? (
            <button
              type="button"
              disabled
              onClick={ onClickEvent }
              data-testid={ dataTestId }
            >
              {buttonContent}
            </button>
          ) : (
            <button type="button" onClick={ onClickEvent } data-testid={ dataTestId }>
              { buttonContent }
            </button>
          )
        }
      </div>
    );
  }
}

GenericButton.propTypes = {
  buttonContent: PropTypes.string.isRequired,
  onClickEvent: PropTypes.func,
  disabledButton: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
};

GenericButton.defaultProps = {
  onClickEvent: () => '',
  disabledButton: false,
};

export default GenericButton;
