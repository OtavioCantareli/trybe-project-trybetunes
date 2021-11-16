import React from 'react';
import Header from '../components/Header';
import Results from '../components/Results';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.organizeResults = this.organizeResults.bind(this);
    this.state = {
      value: '',
      isLoading: false,
      positiveResult: false,
      nameDisplay: '',
      results: [],
    };
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  search() {
    const { value } = this.state;
    this.setState({ isLoading: true });
    searchAlbumsAPI(value).then((results) => {
      this.setState(
        { isLoading: false, positiveResult: true, nameDisplay: value, results },
        () => {
          this.setState({ value: '' });
        },
      );
    });
  }

  organizeResults(results) {
    return results.map((result) => {
      const {
        artistName: name,
        collectionName,
        collectionId,
        artworkUrl100,
      } = result;
      return (
        <Results
          key={ collectionId }
          id={ collectionId }
          artistName={ name }
          image={ artworkUrl100 }
          albumTitle={ collectionName }
        />
      );
    });
  }

  render() {
    const { value, isLoading, positiveResult, results, nameDisplay } = this.state;
    const { onChange, search, organizeResults } = this;
    const length = 2;
    const noResults = <span>Nenhum álbum foi encontrado</span>;

    const showResults = (
      <div>
        <p>
          Resultado de álbuns de:
          {` ${nameDisplay}`}
        </p>
        <p>{results.length < 1 ? noResults : organizeResults(results)}</p>
      </div>
    );
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
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
              onClick={ () => search() }
            >
              Pesquisar
            </button>
          </div>
        )}
        {positiveResult && showResults}
        {' '}
        {
          // Renderização condicional
        }
      </div>
    );
  }
}
