import { element } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    
    this.state = {
      albumSongPreview: [],
      favoriteSongs: [],
      searching: false,
    }
    this.saveFavoriteSongs = this.saveFavoriteSongs.bind(this);
    this.tickCheckboxForFavoriteSongs = this.tickCheckboxForFavoriteSongs.bind(this);
  }

  tickCheckboxForFavoriteSongs() {
    
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const func = async () => {
      const data = await getMusics(id);
      this.setState({ albumSongPreview: data });
    }
    func();
    this.setState({ searching: true }, async () => {
      const dataFavoriteSongs = await getFavoriteSongs();
      this.setState({ searching: false,  favoriteSongs: dataFavoriteSongs });
    });
  }

  componentDidUpdate() {
    const { albumSongPreview, favoriteSongs } = this.state;
    favoriteSongs.map((element) => {
      albumSongPreview.map((element2) => {
        if (element.trackId === element2.trackId) {
          const checkboxMusicCard = document.querySelector(`#checkboxFavorite-${element2.trackId}`);
          if (checkboxMusicCard) {
            checkboxMusicCard.checked = true;
          } 
        }
      });
    });
  }

  saveFavoriteSongs({ target }) {
    const { name, checked } = target;
    const { albumSongPreview, favoriteSongs } = this.state;
    const trackId = Number(name.replace('favorite-', ''));
    let isFavorited = false;
    favoriteSongs.map((element) => {
      if (element.trackId === trackId) {
        isFavorited = true;
      }
    });
    albumSongPreview.map((element) => {
      if (
        checked === true
        && isFavorited === false
        && element.trackId === trackId
      ) {
        this.setState(
          (prevState) => ({
            favoriteSongs: [...prevState.favoriteSongs, element],
            searching: true,
          }),
          () => {
            console.log(element)
            addSong(element);
            this.setState({ searching: false });
          }
        );
      }
    });
  }

  render() {
    const { albumSongPreview, searching } = this.state;
    let collection = [];
    if (albumSongPreview.length > 0) {
      collection = [albumSongPreview[0]];
    }
    
    return (
      <div data-testid="page-album">
        <Header dataTestId="header-component" />
        {collection.map((element) => (
          <section key={element.collectionName}>
            <div>
              <img
                src={element.artworkUrl100}
                alt={`imageMusic: ${element.trackName}`}
              />
            </div>
            <h1 data-testid="album-name">
              {element.collectionName} - {element.artistName}
            </h1>
            <h3 data-testid="artist-name">{element.artistName}</h3>
          </section>
        ))}
        {
          searching ? (
            <div>Carregando...</div>
          ) : (
            <MusicCard
              albumSongPreview={albumSongPreview.slice(1)}
              funcSaveFavoriteSongsInState={this.saveFavoriteSongs}
            />
          )
        }
      </div>
    );
  }
}

export default Album;
