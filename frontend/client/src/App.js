import React, { Component } from 'react';
import './App.css';
import PlaylistContainer from './Components/PlaylistContainer'
import NavBar from './Components/NavBar'
import { Route } from 'react-router-dom'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      params: params,
      playing: false,
      audioFile: ''
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  handlePlayPause = (id) => {
    spotifyApi.getTrack(id)
    .then(res => this.setState({
      playing: !this.state.playing,
      audioFile: res.preview_url
    }))
  }


  render() {
    console.log(this.state.loggedIn)
    return (
      <span>
        <NavBar params={this.state.params} playing={this.state.playing} audioFile={this.state.audioFile}/>
        <div className="header-maincontainer">
          <div className="header-titlecontainer">
            <h1 className="header-title">Pace Maker</h1>
            <p className="header-text">
            Pace Maker generates a playlist of songs based on your running pace.<br/>

            Next, choose your desired running pace. You will then get a list of tracks with a tempo (beats per minute) matched with your desired pace.
            </p>
          </div>
        </div>
        { this.state.loggedIn
        ?
        <span>
          <div className="choices-container wrapper">
            <p className="numbered-choices">1</p>
            <p className="firstchoice-text">Choose either your saved songs, <br/>
            or a genre of your liking:</p>
          </div>
          <div className="body-container wrapper">
            < PlaylistContainer params={this.state.params} handlePlayPause={this.handlePlayPause} playing={this.state.playing}/>
          </div>
        </span>
        :
        <span>
          <div className="body-container wrapper">
            <p className="header-text">To get started, login with your Spotify credentials.<br/></p>
            <div className="wrapper">
              <button className="login-button"><a href='http://localhost:8888'>Login with Spotify</a></button>
            </div>
          </div>
        </span>
        }
      </span>
    );
  }
}

export default App;

// <Route path="/playlists" component={ PlaylistContainer } params={this.state.params}/>
