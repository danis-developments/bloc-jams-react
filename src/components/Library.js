import './Library.css';
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
      <section className="library light-blue vintage-concrete-blurred-background">
        {
          this.state.albums.map( ( album, index) => 
            <div key={index} className="album row">
              <Link to={`/album/${album.slug}`} key={index} className="cyan-text text-accent-1">
                <div className="left col s12 m4">
                  <img className="album-cover" src={album.albumCover} alt={album.title} />
                </div>
                <div className="album-details left col s12 m4">
                  <div className="album-name">{album.title}</div>
                  <div className="album-artist">{album.artist}</div>
                  <div className="songs-number">{album.songs.length} songs</div>
                </div>
              </Link>
            </div>
          )
        }
      </section>
    );
  }
}

export default Library;