import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      searching: false,
    };
    this.removeMusicFromFavorites = this.removeMusicFromFavorites.bind(this);
  }

  componentDidMount() {
    const func = async () => {
      this.setState({ searching: true });
      const dataFavoriteSongs = await getFavoriteSongs();
      this.setState({ searching: false, favoriteSongs: dataFavoriteSongs });
    };
    func();
  }

  componentDidUpdate() {
    const { favoriteSongs } = this.state;
    favoriteSongs.map((element) => {
      const checkboxMusicCard = document.querySelector(
        `#checkboxFavorite-${element.trackId}`,
      );
      if (checkboxMusicCard) {
        checkboxMusicCard.checked = true;
      }
      return '';
    });
  }

  removeMusicFromFavorites({ target }) {
    const { name } = target;
    const { favoriteSongs } = this.state;
    const trackId = Number(name.replace('favorite-', ''));
    favoriteSongs.map((element) => {
      if (element.trackId === trackId) {
        this.setState({ searching: true }, async () => {
          removeSong(element);
          const dataFavoriteSongs = await getFavoriteSongs();
          this.setState({ searching: false, favoriteSongs: dataFavoriteSongs });
        });
      }
      return '';
    });
  }

  render() {
    const { favoriteSongs, searching } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header dataTestId="header-component" />
        {
          searching ? (
            <div>Carregando...</div>
          ) : (
            <MusicCard
              playlist={ favoriteSongs }
              functionForOnClickEvent={ this.removeMusicFromFavorites }
            />
          )
        }
      </div>
    );
  }
}

export default Favorites;
