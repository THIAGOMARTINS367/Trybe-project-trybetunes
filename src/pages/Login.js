import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import GenericButton from '../components/GenericButton';
import LabelAndInput from '../components/LabelAndInput';
import Search from './Search';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: { name: '' },
      loading: false,
      redirect: false,
    };

    this.saveNewUserInState = this.saveNewUserInState.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  saveNewUserInState({ target }) {
    const { name, value } = target;
    this.setState({ userName: { [name]: value } });
  }

  createNewUser() {
    const { userName } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser(userName);
      this.setState({ loading: false, redirect: true });
    });
  }

  render() {
    const { userName, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <BrowserRouter>
          <Switch>
            <Route path="/search" component={ Search } />
          </Switch>
        </BrowserRouter>
        { redirect ? <Redirect to="/search" /> : false }
        {
          loading ? (
            'Carregando...'
          ) : (
            <form>
              <LabelAndInput
                labelContent="Nome"
                inputType="text"
                inputName="name"
                inputValue={ userName.name }
                inputID="input-user-name"
                onChangeEvent={ this.saveNewUserInState }
                dataTestId="login-name-input"
              />
              <GenericButton
                buttonContent="Entrar"
                onClickEvent={ this.createNewUser }
                dataTestId="login-submit-button"
              />
            </form>
          )
        }
      </div>
    );
  }
}

export default Login;
