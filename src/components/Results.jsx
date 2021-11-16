import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Criei esse componente baseado no repositório do Guilherme Augusto

export default class Results extends React.Component {
  render() {
    const { id, artistName, image, albumTitle } = this.props;
    return (
      <div>
        <Link data-testid={ `link-to-album-${id}` } to={ `/album/${id}` }>
          <img src={ image } alt={ albumTitle } />
        </Link>
        <div>
          <p>{albumTitle}</p>
          <p>{artistName}</p>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  id: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  albumTitle: PropTypes.string.isRequired,
};
