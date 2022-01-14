import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header dataTestId="header-component" />
        <span>Este é Albúm</span>
      </div>
    );
  }
}

export default Album;
