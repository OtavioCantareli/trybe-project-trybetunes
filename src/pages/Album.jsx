import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songList: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    getMusics(id).then((music) => {
      this.addSongs(music);
    });
  }

  addSongs(songList) {
    this.setState({ songList });
  }

  render() {
    const { songList } = this.state;
    let name = '';
    let title = '';
    if (songList[0]) {
      const { artistName, collectionName } = songList[0];
      name = artistName;
      title = collectionName;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="artist-name">{name}</span>
        <p data-testid="album-name">{title}</p>
        {songList.map(({ trackName, previewUrl, trackId }, index) => {
          if (index !== 0) {
            return (
              <div key={ trackId }>
                <MusicCard trackName={ trackName } previewUrl={ previewUrl } />
              </div>
            );
          }
          return '';
        })}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
