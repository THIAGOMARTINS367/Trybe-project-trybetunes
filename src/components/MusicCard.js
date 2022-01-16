import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelAndCheckbox from './LabelAndCheckbox';

class MusicCard extends Component {
  render() {
    const { playlist, functionForOnClickEvent } = this.props;
    return (
      <section>
        {playlist.map((element) => (
          <section key={ element.trackName }>
            <hr />
            <h2>{ element.trackName }</h2>
            <audio
              data-testid="audio-component"
              src={ element.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento audio.
            </audio>
            <LabelAndCheckbox
              labelContent="Favorita"
              inputName={ `favorite-${element.trackId}` }
              inputID={ `checkboxFavorite-${element.trackId}` }
              onChangeEvent={ functionForOnClickEvent }
              dataTestId={ `checkbox-music-${element.trackId}` }
            />
          </section>
        ))}
      </section>
    );
  }
}

MusicCard.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  functionForOnClickEvent: PropTypes.func,
};

MusicCard.defaultProps = {
  functionForOnClickEvent: () => '',
};

export default MusicCard;
