import './PlayerBar.css';
import React, {Component} from 'react';
import formatTime from './../modules/formatTime';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar pad-top-20">
        <section id="buttons">
          <div className="btn" id="previous" onClick={this.props.handlePrevClick} >
            <i className="small material-icons cyan-text text-accent-3">skip_previous</i>
          </div>
          <div className="btn" id="play-pause" onClick={this.props.handleSongClick} >
            <i className="small material-icons cyan-text text-accent-3">{ this.props.isPlaying ? 'pause' : 'play_arrow' }</i>
          </div>
          <div className="btn" id="next" onClick={this.props.handleNextClick}>
            <i className="small material-icons cyan-text text-accent-3">skip_next</i>
          </div>
        </section>
        <section id="time-control" className="pad-top-20">
          <span className="current-time left">{formatTime(this.props.currentTime)}</span>
          <span id="time-label" className="center">Time</span>
          <span className="total-time right">{formatTime(this.props.duration)}</span>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
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