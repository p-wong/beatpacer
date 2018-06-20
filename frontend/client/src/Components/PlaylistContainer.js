import React, { Component } from 'react'
import NavBar from './NavBar'
import '../App.css';
import 'semantic-ui-css/semantic.min.css'

import UserSavedTracksContainer from './GenreContainers/UserSavedTracksContainer'
import Top40TracksContainer from './GenreContainers/Top40TracksContainer'
import PopTracksContainer from './GenreContainers/PopTracksContainer'
import HipHopTracksContainer from './GenreContainers/HipHopTracksContainer'
import CountryTracksContainer from './GenreContainers/CountryTracksContainer'
import RockTracksContainer from './GenreContainers/RockTracksContainer'
import ElectronicTracksContainer from './GenreContainers/ElectronicTracksContainer'

import PresentationalTracks from './PresentationalTracks'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class PlaylistContainer extends Component {
  
  //Selecting the playlist
  handleDropdowns = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //Rendering the "Select Playlist" dropdown onto the page


  //Removing duplicates from the tracks received from the playlist API calls
  removeDupes = (allTracks, firstAttr, sndAttr) => {
    let noDupes = []
    const hash = new Set()
    for (let i = 0; i < allTracks.length; i++) {
      const foo = typeof firstAttr === 'function' ? null : allTracks[i][firstAttr][sndAttr]
      if (!hash.has(foo)) {
        noDupes.push(allTracks[i])
        hash.add(foo)
      }
    }
    return noDupes
  }

  //Getting all the audio features of each track - looping through tracks 50 at a time to prevent exceeding rate limit
  getAudioFeatures() {
    let counter = 0
    let tracksBeginning = 0
    let tracksCounter = 50
    let trackBatchesInIncrementOf50 = Math.ceil(this.state.allTracks.length / 50)
    let getAudioFeaturesBatch = setInterval( () => {
      this.state.allTracks.slice(tracksBeginning, (tracksBeginning + tracksCounter)).map(t => { return (
        spotifyApi.getAudioFeaturesForTrack(t.track.id)
        .then(res => {this.setState({ allTracksWithDetails: [...this.state.allTracksWithDetails, {...t, audioFeatures: res, source: 'pop' }] }, () => {this.setState({ filteredTracks: [...this.state.allTracksWithDetails]} )}) })
        .catch(e => console.log(e))
      )})
      counter++
      tracksBeginning += tracksCounter
      if (counter === trackBatchesInIncrementOf50) {
        clearInterval(getAudioFeaturesBatch)
      }
    }, 5000)
  }

  //Rendering the "Select Pace" dropdown onto the page
  renderPaceDropdown() {
    let time = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00']
    return (
      <select className='playlist-dropdown' name='paceSelected' value={this.state.paceSelected} onChange={this.filterByPace}>
        <option>Choose one</option>
        {time.map(t => <option>{t} min/mile</option>)}
      </select>
    )
  }

  //Filtering the tracks by the pace selected. Tracks with tempo +/- 5bpm to the target will be rendered
  filterByPace(event) {
    this.setState({
      paceSelected: event.target.value
    }, () => {
      const data =
       [{'8:00': 170},
        {'8:30': 165},
        {'9:00': 160},
        {'9:30': 155},
        {'10:00': 150},
        {'10:30': 145},
        {'11:00': 140},
        {'11:30': 135},
        {'12:00': 130},
        {'12:30': 125},
        {'13:00': 120}]
      let pace = this.state.paceSelected.split(" ")[0]
      let bpm = data.filter(d => d[pace])[0][pace]
      var filteredTracks = this.state.allTracksWithDetails.filter(track => (track.audioFeatures.tempo > (bpm - 5) && track.audioFeatures.tempo < (bpm + 5)))
      this.setState({
        filteredTracks: filteredTracks
      }, () => this.setState({ filteredTracksId: this.state.filteredTracks.map(t => 'spotify:track:' + t.track.id) }) )
    })
  }

  //Converting ms to min (used to calculate the total duration of all tracks, and duration of each track)
  convertMillisecondsToMinutes = (millis) => {
    let minutes = Math.floor(millis / 60000)
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  //Adding the duration of all tracks rendered
  addAllDuration() {
    if (this.state.filteredTracks.length > 0) {
      const duration = this.state.filteredTracks.map(t => t.track.duration_ms)
      const sum = duration.reduce((total, amount) => total + amount)
      return this.convertMillisecondsToMinutes(sum)
    }
  }

  //Rendering each container based on the genre selected by the user
  renderContainers = () => {
    if (this.props.playlistSelected === 'Your Saved Tracks') {
      return (
        <div>
          < UserSavedTracksContainer />
        </div>
      )
    } else if (this.props.playlistSelected === 'Top 40') {
      return (
        <div>
          < Top40TracksContainer params={this.props.params}
                                 removeDupes={this.removeDupes}
                                 getAudioFeatures={this.getAudioFeatures}
                                 renderPaceDropdown={this.renderPaceDropdown}
                                 filterByPace={this.filterByPace}
                                 convertMillisecondsToMinutes={this.convertMillisecondsToMinutes}
                                 addAllDuration={this.addAllDuration}
                                 getAllTracks={this.getAllTracks}
                                 renderCreatePlaylistButton={this.renderCreatePlaylistButton}
                                 createAndAddPlaylistOnSpotify={this.createAndAddPlaylistOnSpotify}
                                 playlistSelected={this.props.playlistSelected}
                                 handlePlayPause={this.props.handlePlayPause}
                                 />
        </div>
      )
    } else if (this.props.playlistSelected === 'Pop') {
      return (
        <div>
          < PopTracksContainer params={this.props.params}
                               removeDupes={this.removeDupes}
                               getAudioFeatures={this.getAudioFeatures}
                               renderPaceDropdown={this.renderPaceDropdown}
                               filterByPace={this.filterByPace}
                               convertMillisecondsToMinutes={this.convertMillisecondsToMinutes}
                               addAllDuration={this.addAllDuration}
                               getAllTracks={this.getAllTracks}
                               renderCreatePlaylistButton={this.renderCreatePlaylistButton}
                               createAndAddPlaylistOnSpotify={this.createAndAddPlaylistOnSpotify}
                               playlistSelected={this.props.playlistSelected}
                               handlePlayPause={this.props.handlePlayPause}
                               />
        </div>
      )
    } else if (this.props.playlistSelected === 'Hip-Hop') {
      return (
        <div>
          < HipHopTracksContainer params={this.props.params}
                                 removeDupes={this.removeDupes}
                                 getAudioFeatures={this.getAudioFeatures}
                                 renderPaceDropdown={this.renderPaceDropdown}
                                 filterByPace={this.filterByPace}
                                 convertMillisecondsToMinutes={this.convertMillisecondsToMinutes}
                                 addAllDuration={this.addAllDuration}
                                 getAllTracks={this.getAllTracks}
                                 renderCreatePlaylistButton={this.renderCreatePlaylistButton}
                                 createAndAddPlaylistOnSpotify={this.createAndAddPlaylistOnSpotify}
                                 playlistSelected={this.props.playlistSelected}
                                 handlePlayPause={this.props.handlePlayPause}
                                 />
        </div>
      )
    } else if (this.props.playlistSelected === 'Country') {
      return (
        <div>
          < CountryTracksContainer params={this.props.params}
                                   removeDupes={this.removeDupes}
                                   getAudioFeatures={this.getAudioFeatures}
                                   renderPaceDropdown={this.renderPaceDropdown}
                                   filterByPace={this.filterByPace}
                                   convertMillisecondsToMinutes={this.convertMillisecondsToMinutes}
                                   addAllDuration={this.addAllDuration}
                                   getAllTracks={this.getAllTracks}
                                   renderCreatePlaylistButton={this.renderCreatePlaylistButton}
                                   createAndAddPlaylistOnSpotify={this.createAndAddPlaylistOnSpotify}
                                   playlistSelected={this.props.playlistSelected}
                                   handlePlayPause={this.props.handlePlayPause}
                                   />
        </div>
      )
    } else if (this.props.playlistSelected === 'Rock') {
      return (
        <div>
          < RockTracksContainer params={this.props.params}
                               removeDupes={this.removeDupes}
                               getAudioFeatures={this.getAudioFeatures}
                               renderPaceDropdown={this.renderPaceDropdown}
                               filterByPace={this.filterByPace}
                               convertMillisecondsToMinutes={this.convertMillisecondsToMinutes}
                               addAllDuration={this.addAllDuration}
                               getAllTracks={this.getAllTracks}
                               renderCreatePlaylistButton={this.renderCreatePlaylistButton}
                               createAndAddPlaylistOnSpotify={this.createAndAddPlaylistOnSpotify}
                               playlistSelected={this.props.playlistSelected}
                               handlePlayPause={this.props.handlePlayPause}
                               />
        </div>
      )
    } else if (this.props.playlistSelected === 'Electronic') {
      return (
        <div>
          < ElectronicTracksContainer params={this.props.params}
                                     removeDupes={this.removeDupes}
                                     getAudioFeatures={this.getAudioFeatures}
                                     renderPaceDropdown={this.renderPaceDropdown}
                                     filterByPace={this.filterByPace}
                                     convertMillisecondsToMinutes={this.convertMillisecondsToMinutes}
                                     addAllDuration={this.addAllDuration}
                                     getAllTracks={this.getAllTracks}
                                     renderCreatePlaylistButton={this.renderCreatePlaylistButton}
                                     createAndAddPlaylistOnSpotify={this.createAndAddPlaylistOnSpotify}
                                     playlistSelected={this.props.playlistSelected}
                                     handlePlayPause={this.props.handlePlayPause}
                                     />
        </div>
      )
    } else {
      null
    }
  }

  //Rendering all tracks via a presentational component
  getAllTracks() {
    return < PresentationalTracks filteredTracks={this.state.filteredTracks}
                                  convertMillisecondsToMinutes={this.props.convertMillisecondsToMinutes}
                                  handlePlayPause={this.props.handlePlayPause}
                                  playing={this.props.playing}
                                  />
  }

  //Rendering the button to create the playlist on the user's Spotify account
  renderCreatePlaylistButton() {
    return <button className='create-playlist-button' onClick={this.createAndAddPlaylistOnSpotify}>Create Playlist</button>
  }

  //Creates an empty playlist on Spotify, and then adds tracks to it
  createAndAddPlaylistOnSpotify () {
    let playlistName = this.state.paceSelected + ' ' + this.props.playlistSelected + ' Playlist'
    spotifyApi.getMe()
    .then(response => this.setState({user: response}, () => {
      spotifyApi.createPlaylist(this.state.user.id, {name: playlistName})
      .then(response => spotifyApi.addTracksToPlaylist(this.state.user.id, response.id, this.state.filteredTracksId))
    }))}

  render() {
    // console.log()
    return (
      <div>
        {this.renderContainers()}

      </div>
    )
  }
}

export default PlaylistContainer
