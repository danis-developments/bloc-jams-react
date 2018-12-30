import React, {Component} from 'react';
import formatTime from './../modules/formatTime';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick} >
          <i className="small material-icons cyan-text text-accent-3">skip_previous</i>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <i className="small material-icons cyan-text text-accent-3">{ this.props.isPlaying ? 'pause' : 'play_arrow' }</i>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
          <i className="small material-icons cyan-text text-accent-3">skip_next</i>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">{formatTime(this.props.currentTime)}</div>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">{formatTime(this.props.duration)}</div>
        </section>
        <section id="volume-control">
          <input
            type="range"
            className="seek-bar"
            value={this.props.volume}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}
          />
          <div className="current-volume">{"Volume: " + Math.round(this.props.volume*100) + "%"}</div>        
        </section>
      </section>
    )
  }
}

export default PlayerBar;