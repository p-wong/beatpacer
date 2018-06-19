import React, { Component } from 'react'
import PresentationalTracks from '../PresentationalTracks'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class UserSavedTracksContainer extends Component {
  state = {
    userSavedTracks: [],

    allTracksWithDetails: [],
  }

  componentDidMount = () => {
    spotifyApi.getMySavedTracks({limit: 50})
    .then(response => { this.setState({ userSavedTracks: response.items }, () =>
      this.state.userSavedTracks.map(t => { return (
        spotifyApi.getAudioFeaturesForTrack(t.track.id)
        .then(res => { this.setState({ allTracksWithDetails: [...this.state.allTracksWithDetails, {...t, audioFeatures: res, source: 'user'}] }) })
        .catch(e => { console.log(e) })
      )}))
    })
  }

  getUserSavedTracks = () => {
    return (this.state.allTracksWithDetails.map ((t) => {
      return < PresentationalTracks key={t.track.id}
                                    id={t.track.id}
                                    name={t.track.name}
                                    tempo={t.audioFeatures.tempo}
                                    duration={t.track.duration_ms}
                                    artists={t.track.artists.map(artist => artist.name)}
                                    source={t.source}
                                    />
    }))
  }


  render() {
    console.log(this.state.userSavedTracks)
    console.log(this.state.allTracksWithDetails)
    return(
      <div>
        {this.getUserSavedTracks()}
      </div>
    )
  }


}

export default UserSavedTracksContainer
