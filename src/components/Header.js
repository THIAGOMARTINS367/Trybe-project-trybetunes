import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    const searchingUser = async () => {
      const data = await getUser();
      this.setState({ user: data });
    };
    searchingUser();
  }

  render() {
    const { dataTestId } = this.props;
    const { user } = this.state;
    return (
      <header data-testid={ dataTestId }>
        {user === '' ? (
          <p>Carregando...</p>
        ) : (
          <span data-testid="header-user-name">{ user.name }</span>
        )}
        <ul>
          <li><Link to="/search" data-testid="link-to-search">Pesquisa</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
