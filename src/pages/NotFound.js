import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <span>Não existe uma página para esta rota</span>
      </div>
    );
  }
}

export default NotFound;
