import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: '',
    };
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;
    const { onChange } = this;
    const length = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Name of band?"
          onChange={ onChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          value={ value }
          disabled={ value.length < length }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
