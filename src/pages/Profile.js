import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      profileData: {},
      searching: false,
    };
  }

  componentDidMount() {
    const func = async () => {
      this.setState({ searching: true });
      const userProfileData = await getUser();
      this.setState({ searching: false, profileData: userProfileData });
    };
    func();
  }

  render() {
    const { searching, profileData } = this.state;
    const { name, email, image, description } = profileData;
    return (
      <div data-testid="page-profile">
        <Header dataTestId="header-component" />
        {searching ? (
          <div>Carregando...</div>
        ) : (
          <section>
            <div>
              <img
                src={ image }
                alt={ `Imagem de ${name}` }
                data-testid="profile-image"
              />
            </div>
            <p>
              Nome:
              <br />
              <span data-testid="header-user-name">{name}</span>
            </p>
            <p>
              Email:
              <br />
              <span>{email}</span>
            </p>
            <p>
              Descrição:
              <br />
              <span>{description}</span>
            </p>
            <Link to="/profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
