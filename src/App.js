import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App light-blue darken-4">
          <nav className="no-pad-bot">
            <div className="nav-wrapper light-blue darken-4 valign-wrapper">
              <Link to='/' className="brand-logo right cyan-text text-accent-1">TuneBag<img src="/assets/images/TuneBag-cropped.png" /></Link>
            </div>
          </nav>
        <div id="jukebox-background">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </div>
      </div>
    );
  }
}

export default App;
