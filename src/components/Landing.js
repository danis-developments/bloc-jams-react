import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <section className="landing">
    <div id="hero-image" className="valign-wrapper">
      <Link to='/library' className="center container cyan-text text-accent-2">
        <h1>Turn the music up!</h1>
      </Link>
    </div>
    <section className="selling-points row light-blue darken-4 cyan-text text-accent-1">
      <div className="section col s12 m4">
        <div className="icon-block center container">
          <i className="medium material-icons">person</i>
          <h2 className="point-title">Choose your music</h2>
          <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
          <i className="tiny material-icons hide-on-med-and-up">fiber_manual_record</i>
       </div>
      </div>
      <div className="section col s12 m4">
        <div className="icon-block center container">
          <i className="medium material-icons">all_inclusive</i>
          <h2 className="point-title">Unlimited ad-free streaming</h2>
          <p className="point-description">Endless music. No distractions.</p>
          <i className="tiny material-icons hide-on-med-and-up">fiber_manual_record</i>
        </div>
      </div>
      <div className="section col s12 m4">
        <div className="icon-block center container">
          <i className="medium material-icons">phone_iphone</i>
          <h2 className="point-title">Mobile enabled</h2>
          <p className="point-description">Listen to your music on the go! TuneBag is available on all mobile platforms.</p>
          <i className="tiny material-icons hide-on-med-and-up">fiber_manual_record</i>
        </div>
      </div>
    </section>
  </section>
);

export default Landing;