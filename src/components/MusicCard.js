import React, { Component } from "react";

class MusicCard extends Component {
  render() {
    const { albumSongPreview } = this.props;
    return (
      <section>
        {
          albumSongPreview.map((element) => (
            <section key={element.trackName}>
              <hr />
              <h2>{element.trackName}</h2>
              <audio data-testid="audio-component" src={ element.previewUrl } controls>
                <track kind="captions" />
                  O seu navegador não suporta o elemento <code>audio</code>.
              </audio>
            </section>
          ))
        }
      </section>
    )
  }
}

export default MusicCard;
