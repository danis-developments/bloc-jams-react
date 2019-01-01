import './Album.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import formatTime from './../modules/formatTime';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });
    
    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      focusedSongNumber: null,
      isPlaying: false,
      volume: 0.8,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
    }

    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }
  
  componentWillUnmount(){
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    if(this.state.isPlaying){
      this.play();
    }
   }
  

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    if(this.state.isPlaying){
      this.play();
    }
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong){
      this.pause();
    } else {
      if(!isSameSong){ 
        this.setSong(song);
      }
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    if(this.audioElement.currentTime === this.audioElement.duration){
      this.pause();
    }
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    console.log("Volume Change" + e.target.value);
    this.audioElement.volume = e.target.value;
    this.setState({ volume: this.audioElement.volume });
  }

  handleSongMouseEnter(index){
    this.setState({ focusedSongNumber: index });
  }

  handleSongMouseLeave(){
    this.setState({ focusedSongNumber: null });
  }

  pause(){
    this.audioElement.pause();
    this.setState({ isPlaying: false,
                  });
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song, 
                  });
  }

  songNumberPlayPauseIcon(song, index){
    if((song === this.state.currentSong) && this.state.isPlaying){
      return (<i className="material-icons tiny">pause</i>)                        
    } else if (index === this.state.album.songs.findIndex(song => this.state.currentSong === song) || index === this.state.focusedSongNumber){
     return (<i className="material-icons tiny">play_arrow</i>)                        
    } else {
      return (index + 1)
    }
  }

  render() {
    return (
      <section className="vintage-concrete-blurred-background">
        <div className="row pad-top-20">
          <div className="col s12 center">
            <Link to="/library" className="btn cyan-text text-accent-1 ">Return to Library</Link>
          </div>
        </div>
        <div className="album center cyan-text text-accent-1 row">
          <div id="album-info" className="col s12 m6">
            <img className="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <div className="album-details">
              <div className="album-title">{this.state.album.title}</div>
              <div className="artist">{this.state.album.artist}</div>
              <div id="release-info">&copy;{this.state.album.releaseInfo}</div>
            </div>
          </div>
          <div id="songs-player-bar-wrapper" className="container">
            <div id="songs-wrapper" className="col s12 m6">
              <table id="song-list">
                <colgroup>
                  <col id="song-number-column" />
                  <col id="song-title-column" />
                  <col id="song-duration-column" />
                </colgroup>
                <tbody>
                  {this.state.album.songs.map((song, index) => {
                    return (<tr className="song" 
                                key={index} 
                                onClick={() => this.handleSongClick(song, index)} 
                                onMouseEnter={() => this.handleSongMouseEnter(index)}
                                onMouseLeave={() => this.handleSongMouseLeave()} >
                              <td className="songNumber">{this.songNumberPlayPauseIcon(song, index)}</td>
                              <td>{song.title}</td>
                              <td>{formatTime(song.duration)}</td>
                            </tr>)
                    })
                  }
                </tbody>
              </table>
            </div>
            <div id="player-bar-wrapper" className="col s12 m6">
              <PlayerBar  
                isPlaying={this.state.isPlaying} 
                currentSong={this.state.currentSong} 
                currentTime={this.state.currentTime}
                duration={this.state.duration}
                volume={this.state.volume}
                handleNextClick={() => this.handleNextClick()}
                handlePrevClick={() => this.handlePrevClick()}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)} 
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="row pad-bottom-20">
          <div className="col s12 center">
            <Link to="/library" className="btn cyan-text text-accent-1 ">Return to Library</Link>
          </div>
        </div>

      </section>

    );
  }
}

export default Album;