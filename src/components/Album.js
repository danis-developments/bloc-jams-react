import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });
    
    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      focusedSong: -1,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause(){
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongMouseEnter(song, index){
    this.setState({ focusedSong: index });
  }

  handleSongMouseLeave(){
    this.setState({ focusedSong: -1 });
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

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map((song, index) => {
              let songNumberContent;
              if((song === this.state.currentSong) && this.state.isPlaying){
                songNumberContent = (<span className="ion-md-pause"></span>)                        
              } else if (index === this.state.focusedSong){
                songNumberContent = (<span className="ion-md-play"></span>)                        
              } else {
                songNumberContent = (index + 1)
              }
            
              return (<tr className="song" 
                          key={index} 
                          onClick={() => this.handleSongClick(song)} 
                          onMouseEnter={() => this.handleSongMouseEnter(song, index)}
                          onMouseLeave={() => this.handleSongMouseLeave()} >
                        <td className="songNumber">{songNumberContent}</td>
                        <td>{song.title}</td>
                        <td>{song.duration}</td>
                      </tr>)
              })
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;