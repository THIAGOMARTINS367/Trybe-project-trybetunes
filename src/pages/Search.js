import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header dataTestId="header-component" />
        <span>Este é Search</span>
      </div>
    );
  }
}

export default Search;
