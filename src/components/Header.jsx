import React from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  componentDidMount() {
    return getUser();
  }

  render() {
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{() => getUser()}</span>
      </header>
    );
  }
}
