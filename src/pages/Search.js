import { element } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GenericButton from '../components/GenericButton';
import Header from '../components/Header';
import LabelAndInput from '../components/LabelAndInput';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super()

    this.state = {
      artistOrBandName: '',
      temporaryDataArtistOrBandName: '',
      disabledButton: true,
      dataOfArtistOrBand: [],
      searching: false,
      requestError: false,
    };

    this.saveArtistOrBandNameInState = this.saveArtistOrBandNameInState.bind(this);
    this.validateFormSearchField = this.validateFormSearchField.bind(this);
    this.searchArtistOrBand = this.searchArtistOrBand.bind(this);
  }

  validateFormSearchField() {
    const { temporaryDataArtistOrBandName } = this.state;
    if (temporaryDataArtistOrBandName.length < 2 ) {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }

  }

  saveArtistOrBandNameInState({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () =>
      this.validateFormSearchField()
    );
  }

  searchArtistOrBand() {
    const { temporaryDataArtistOrBandName } = this.state;
    this.setState({ searching: true, artistOrBandName: temporaryDataArtistOrBandName }, async () => {
      const data = await searchAlbumsAPI(temporaryDataArtistOrBandName.toLocaleUpperCase());
      if (data.length === 0) {
        this.setState({ requestError: true });
      }
      this.setState({
        temporaryDataArtistOrBandName: '',
        disabledButton: true,
        dataOfArtistOrBand: data,
        searching: false,
      });
    });
  }

  render() {
    const {
      artistOrBandName,
      temporaryDataArtistOrBandName,
      disabledButton,
      dataOfArtistOrBand,
      searching,
      requestError,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header dataTestId="header-component" />
        {
          searching ? (
            <div>Carregando...</div>
          ) : (
            <section>
              <form>
                <LabelAndInput
                  labelContent="Pesquisar Favoritas"
                  inputType="text"
                  inputName="temporaryDataArtistOrBandName"
                  inputValue={temporaryDataArtistOrBandName}
                  inputID="input-search-artist"
                  placeholderContent="Artista ou Banda"
                  onChangeEvent={this.saveArtistOrBandNameInState}
                  dataTestId="search-artist-input"
                />
                <GenericButton
                  buttonContent="Pesquisar"
                  disabledButton={disabledButton}
                  onClickEvent={this.searchArtistOrBand}
                  dataTestId="search-artist-button"
                />
              </form>
              {
                artistOrBandName.length > 0 ? (
                  <span>Resultado de álbuns de: { artistOrBandName }</span>
                ) : (
                  false
                )
              }
              {
                dataOfArtistOrBand.map((element) => (
                  <section key={`${element.collectionName}_${element.collectionId}`}>
                    <ul>
                      <li>{element.collectionId}</li>
                      <li>{element.collectionName}</li>
                      <Link to={`/album/${element.collectionId}`} data-testid={`link-to-album-${element.collectionId}`}>
                        <li>
                          <img src={element.artworkUrl100} alt={element.collectionName} />
                        </li>
                      </Link>
                      <li>Name: {element.artistName}</li>
                    </ul>
                  </section>
                ))
              }
              {requestError && <div>Nenhum álbum foi encontrado</div>}
            </section>
          )
        }
      </div>
    );
  }
}

export default Search;
