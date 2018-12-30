import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums.js';

class Library extends Component {
  constructor(props){
    super(props);
    this.state = {
      albums : albumData,
    };
  }

  render() {
    return(
      <section className="library center light-blue" id="jukebox-background">
        {
          this.state.albums.map( ( album, index) => 
            <div key={index} className="album">
              <Link to={`/album/${album.slug}`} key={index} className="cyan-text text-accent-1 flex-text">
                <img src={album.albumCover} alt={album.title} />
                <div>{album.title}</div>
                <div>{album.artist}</div>
                <div>{album.songs.length} songs</div>
              </Link>
            </div>
          )
        }
      </section>
    );
  }
}

export default Library;