import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };

    this.fetch = this.fetch.bind(this);
  }

  async fetch() {
    const data = await getUser();
    this.setState({ user: data });
  }

  render() {
    const { dataTestId } = this.props;
    const { user } = this.state;
    this.fetch();
    return (
      <header data-testid={ dataTestId }>
        {user === '' ? (
          <p>Carregando...</p>
        ) : (
          <span data-testid="header-user-name">{ user.name }</span>
        )}
      </header>
    );
  }
}

export default Header;
