import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.name();
  }

  name() {
    getUser().then((user) => {
      this.setState({ userName: user.name });
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">
          Pesquisar
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favoritos
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Perfil
        </Link>
        {userName === '' ? (
          <Loading />
        ) : (
          <span data-testid="header-user-name">{userName}</span>
        )}
      </header>
    );
  }
}
