import { element } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    
    this.state = {
      albumSongPreview: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const func = async () => {
      const data = await getMusics(id);
      // data.splice(0,1);
      this.setState({ albumSongPreview: data });
    }
    func();
  }

  render() {
    const { albumSongPreview } = this.state;
    let collection = [];
    if (albumSongPreview.length > 0) {
      collection = [albumSongPreview[0]];
    }
    
    return (
      <div data-testid="page-album">
        <Header dataTestId="header-component" />
        {
          collection.map((element) => (
            <section key={element.collectionName}>
              <div><img src={element.artworkUrl100} alt={`imageMusic: ${element.trackName}`} /></div>
              <h1 data-testid="album-name">{element.collectionName} - {element.artistName}</h1>
              <h3 data-testid="artist-name">{element.artistName}</h3>
            </section>
          ))
        }
        <MusicCard albumSongPreview={albumSongPreview.slice(1)}/>
      </div>
    );
  }
}

export default Album;
