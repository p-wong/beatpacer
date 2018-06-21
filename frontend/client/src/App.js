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
      <div>
        <button className='playlist-boxes your-saved-tracks' onClick={this.handleDropdowns} name='playlistSelected' value="Your Saved Tracks"><p className='playlist-text'>Your Library</p></button>
        <button className='playlist-boxes top-40' onClick={this.handleDropdowns} name='playlistSelected' value="Top 40"><p className='playlist-text'>Top 40</p></button>
        <button className='playlist-boxes pop' onClick={this.handleDropdowns} name='playlistSelected' value="Pop"><p className='playlist-text'>Pop</p></button>
        <button className='playlist-boxes hip-hop' onClick={this.handleDropdowns} name='playlistSelected' value="Hip-Hop"><p className='playlist-text'>Hip-Hop</p></button>
        <button className='playlist-boxes country' onClick={this.handleDropdowns} name='playlistSelected' value="Country"><p className='playlist-text'>Country</p></button>
        <button className='playlist-boxes rock' onClick={this.handleDropdowns} name='playlistSelected' value="Rock"><p className='playlist-text'>Rock</p></button>
        <button className='playlist-boxes electronic' onClick={this.handleDropdowns} name='playlistSelected' value="Electronic"><p className='playlist-text'>Electronic</p></button>
      </div>
    )
  }

  handleDropdowns = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    console.log(this.state.playlistSelected)
    return (
      <div>
        <NavBar params={this.state.params} playing={this.state.playing} audioFile={this.state.audioFile}/>
        <div className="header-maincontainer">
          <div className="header-titlecontainer">
            <h1 className="header-title">Tempo Run</h1>
            <p className="header-text">
            Generating playlists based on your running pace<br/>
            </p>
          </div>
        </div>
        { this.state.loggedIn
        ?

        <div className="body-full">
          <div className="body-container">
            <p className="firstchoice-text"><div className="numbered-choices">1</div>Choose a genre or your library: <br/>{this.renderPlaylistSourceDropdown()}</p>
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
