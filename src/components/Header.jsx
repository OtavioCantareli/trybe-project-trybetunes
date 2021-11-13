import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  componentDidMount() {
    return getUser();
  }

  render() {
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
        {/* <span data-testid="header-user-name">{() => getUser()}</span> */}
      </header>
    );
  }
}
