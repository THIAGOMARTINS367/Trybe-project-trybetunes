import React, { Component } from "react";
import LabelAndCheckbox from "./LabelAndCheckbox";

class MusicCard extends Component {
  render() {
    const { playlist, functionForOnClickEvent } = this.props;
    return (
      <section>
        {playlist.map((element) => (
          <section key={element.trackName}>
            <hr />
            <h2>{element.trackName}</h2>
            <audio
              data-testid="audio-component"
              src={element.previewUrl}
              controls
            >
              <track kind="captions" />O seu navegador não suporta o elemento{" "}
              <code>audio</code>.
            </audio>
            <LabelAndCheckbox
              labelContent="Favorita"
              inputName={`favorite-${element.trackId}`}
              inputID={`checkboxFavorite-${element.trackId}`}
              onChangeEvent={functionForOnClickEvent}
              dataTestId={`checkbox-music-${element.trackId}`}
            ></LabelAndCheckbox>
          </section>
        ))}
      </section>
    );
  }
}

export default MusicCard;
