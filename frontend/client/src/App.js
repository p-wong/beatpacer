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
      audioFile: '',
      playlistSelected: '',
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

  renderPlaylistSourceDropdown = () => {
    return (
      <select className='playlist-dropdown' name='playlistSelected' value={this.state.playlistSelected} onChange={this.handleDropdowns}>
        <option><i>Playlists</i></option>
        <option>Your Saved Tracks</option>
        <option>Top 40</option>
        <option>Pop</option>
        <option>Hip-Hop</option>
        <option>Country</option>
        <option>Rock</option>
        <option>Electronic</option>
      </select>

    )
  }

  handleDropdowns = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    console.log(this.state.loggedIn)
    return (
      <div>
        <NavBar params={this.state.params} playing={this.state.playing} audioFile={this.state.audioFile}/>
        <div className="header-maincontainer">
          <div className="header-titlecontainer">
            <h1 className="header-title">Pace Maker</h1>
            <p className="header-text">
            Generating playlists based on your running pace<br/>
            </p>
          </div>
        </div>
        { this.state.loggedIn
        ?

          <div className="body-full">
            <div className="body-container">
              <p className="firstchoice-text"><div className="numbered-choices">1</div>  Choose either your saved songs, or a genre of your liking:    {this.renderPlaylistSourceDropdown()}</p>
              < PlaylistContainer params={this.state.params} handlePlayPause={this.handlePlayPause} playing={this.state.playing} playlistSelected={this.state.playlistSelected}/>
            </div>
          </div>

        :

          <div className="body-full">
            <div className="body-container wrapper">
              <p className="header-text">To get started, login with your Spotify credentials.<br/></p>
              <div className="wrapper">
                <button className="login-button"><a href='http://localhost:8888'>Login with Spotify</a></button>
              </div>
            </div>
          </div>

        }
      </div>
    );
  }
}

export default App;

// <Route path="/playlists" component={ PlaylistContainer } params={this.state.params}/>
