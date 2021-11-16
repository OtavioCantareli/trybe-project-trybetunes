import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      isLoading: false,
      isFavorite: false,
    };
  }

  onChange({ target: { name, checked } }) {
    this.setState({ [name]: checked });
    const { songs } = this.props;
    if (checked) {
      this.setState({ isLoading: true }, () => {
        addSong(songs).then(() => {
          this.setState({ isLoading: false });
        });
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const {
      onChange,
      state: { isLoading, isFavorite },
    } = this;
    return (
      <>
        <span>{trackName}</span>
        {isLoading ? (
          <Loading />
        ) : (
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
        )}
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          value={ isFavorite }
          onChange={ onChange }
        />
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  songs: PropTypes.objectOf(PropTypes.any).isRequired,
  trackId: PropTypes.number.isRequired,
};
