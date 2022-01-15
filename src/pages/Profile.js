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
    }
  }

  componentDidMount() {
    this.setState({ searching: true }, async () => {
      const userProfileData = await getUser();
      this.setState({ searching: false,  profileData: userProfileData });
    });
  }

  render() {
    const { searching, profileData } = this.state;
    const { name, email, image, description  } = profileData;
    return (
      <div data-testid="page-profile">
        <Header dataTestId="header-component" />
        {
          searching ? (
            <div>Carregando...</div>
          ) : (
            <section>
              <div><img src={image} alt={`Imagem de ${name}`} data-testid="profile-image"/></div>
              <p>
                Nome: <br />
                {name}
              </p>
              <p>
                Email: <br />
                {email}
              </p>
              <p>
                Descrição: <br />
                {description}
              </p>
              <Link to="/profile/edit"><button type="button">Editar perfil</button></Link>
            </section>
          )
        }
      </div>
    );
  }
}

export default Profile;
