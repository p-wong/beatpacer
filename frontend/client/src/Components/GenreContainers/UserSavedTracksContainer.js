import React, { Component } from 'react'
import PresentationalTracks from '../PresentationalTracks'
import ProgressBar from '../ProgressBar'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class UserSavedTracksContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // userSavedTracks: [],

      allTracks: [],
      allTracksWithDetails: [],
      filteredTracks: [],
      filteredTracksId: [],

      paceSelected: '',
      user: [],

      counter: 1.5,
      show: true
    }
    this.getAudioFeatures = this.props.getAudioFeatures.bind(this)
    this.renderPaceDropdown = this.props.renderPaceDropdown.bind(this)
    this.filterByPace = this.props.filterByPace.bind(this)
    this.addAllDuration = this.props.addAllDuration.bind(this)
    this.convertMillisecondsToMinutes = this.props.convertMillisecondsToMinutes.bind(this)
    this.getAllTracks = this.props.getAllTracks.bind(this)
    this.renderCreatePlaylistButton = this.props.renderCreatePlaylistButton.bind(this)
    this.createAndAddPlaylistOnSpotify = this.props.createAndAddPlaylistOnSpotify.bind(this)
  }

  componentDidMount = () => {
    spotifyApi.getMySavedTracks({limit: 50})
    .then(response => { this.setState({ allTracks: response.items }, () => {
        this.getAudioFeatures()
      })
    })

    setTimeout(() => {
      this.setState({
        show: false
      })
    },((this.state.counter + 0.5) * 5000))
  }

  render() {
    return(
      <div>
        { this.state.show
          ?
          <ProgressBar counter={this.state.counter} filteredTracks={this.state.filteredTracks}/>
          :
          <div><p className="firstchoice-text"><div className="numbered-choices">2</div>Choose your running pace: {this.renderPaceDropdown(this.state.allTracksWithDetails)}</p>
          {this.renderCreatePlaylistButton()}</div>
        }
        {this.getAllTracks()}
        {this.addAllDuration()}
      </div>
    )
  }

}

export default UserSavedTracksContainer
