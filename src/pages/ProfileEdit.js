import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import LabelAndInput from "../components/LabelAndInput";
import { getUser, updateUser } from "../services/userAPI";
import Profile from "./Profile";

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      profileData: {},
      searching: false,
      disabledButton: true,
      newName: '',
      newEmail: '',
      newImage: '',
      newDescription: '',
      redirect: false,
    };
    this.saveEditedProfileDataInState = this.saveEditedProfileDataInState.bind(this);
    this.saveNewProfileData = this.saveNewProfileData.bind(this);
  }

  componentDidMount() {
    this.setState({ searching: true }, async () => {
      const userProfileData = await getUser();
      const { name, email, image, description } = userProfileData;
      this.setState({
        searching: false,
        profileData: userProfileData,
        newName: name,
        newEmail: email,
        newImage: image,
        newDescription: description,
      });
    });
  }

  saveEditedProfileDataInState({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateChangedProfileData());
  }

  validateChangedProfileData() {
    const { newName, newEmail, newImage, newDescription } = this.state;
    let validateEmailFormat = false;
    if (typeof newEmail === 'string') {
      const defaultEmailFormat = /\S+@\S+\.\S+/; // <----- Estas 2 linhas de  código foram retiradas do Artigo:
      validateEmailFormat = defaultEmailFormat.test(newEmail); // <--- https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex
    }
    const validation = [
      typeof newName === "string" && newName.length > 0,
      typeof newEmail === "string" && newEmail.length > 0,
      typeof newImage === 'string' && newImage.length > 0,
      typeof newDescription === 'string' && newDescription.length > 0,
      validateEmailFormat
    ];
    if (validation.includes(false)) {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  }

  // "+": Corresponde ao caractere anterior uma ou mais vezes. Link: https://www.devmedia.com.br/iniciando-expressoes-regulares/6557
  // "\S" Corresponde a qualquer coisa menos um espaço em branco, de acordo com esta referência: http://www.javascriptkit.com/javatutors/redev2.shtml .
  // "\." Serve para indicar que quero literalmente que o caractere "." faça parte do formato padrão e não que
  // faça parte dos quantificadores. Link: https://medium.com/@wilfison/maneira-mais-f%C3%A1cil-de-lembrar-express%C3%B5es-regulares-regex-8a7edfbe669d
  // "@" Indica que quero que o caractere "@" faça parte do formato padrão.

  saveNewProfileData() {
    const { newName, newEmail, newImage, newDescription } = this.state;
    const newProfileData = {
      name: newName,
      email: newEmail,
      image: newImage,
      description: newDescription,
    }
    this.setState({ searching: true }, () => {
      updateUser(newProfileData);
      this.setState({ searching: false, redirect: true });
    });
  }

  render() {
    const {
      searching,
      disabledButton,
      newName,
      newEmail,
      newImage,
      newDescription,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <BrowserRouter>
          <Switch>
            <Route exact path="/profile" component={ Profile } />
          </Switch>
        </BrowserRouter>
        { redirect && <Redirect exact to="/profile" />}
        <Header dataTestId="header-component" />
        {searching ? (
          <div>Carregando...</div>
        ) : (
          <section>
            <LabelAndInput
              labelContent="Nome"
              inputType="text"
              inputName="newName"
              inputValue={ newName }
              inputID="edit-input-name"
              onChangeEvent={ this.saveEditedProfileDataInState }
              dataTestId="edit-input-name"
            />
            <LabelAndInput
              labelContent="Email"
              inputType="email"
              inputName="newEmail"
              inputValue={ newEmail }
              inputID="edit-input-email"
              onChangeEvent={ this.saveEditedProfileDataInState }
              dataTestId="edit-input-email"
            />
            <LabelAndInput
              labelContent="Link da foto"
              inputType="text"
              inputName="newImage"
              inputValue={ newImage }
              inputID="edit-input-image"
              onChangeEvent={ this.saveEditedProfileDataInState }
              dataTestId="edit-input-image"
            />
            <LabelAndInput
              labelContent="Descrição"
              inputType="text"
              inputName="newDescription"
              inputValue={ newDescription }
              inputID="edit-input-description"
              onChangeEvent={ this.saveEditedProfileDataInState }
              dataTestId="edit-input-description"
            />
            <GenericButton
              buttonContent="Salvar Alterações"
              disabledButton={ disabledButton }
              onClickEvent={ this.saveNewProfileData }
              dataTestId="edit-button-save"
            />
          </section>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
