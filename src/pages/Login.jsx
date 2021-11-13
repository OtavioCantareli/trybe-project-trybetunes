import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.state = {
      value: '',
      loading: false,
      redirect: false,
    };
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  // Essa função foi baseada no projeto do Rivaldo
  async saveUser(val) {
    this.setState({ loading: true });
    await createUser({ name: val });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { value, loading, redirect } = this.state;
    const { onChange, saveUser } = this;
    const length = 3;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Name?"
          onChange={ onChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          value={ value }
          disabled={ value.length < length }
          onClick={ (event) => {
            event.preventDefault();
            saveUser(value);
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
