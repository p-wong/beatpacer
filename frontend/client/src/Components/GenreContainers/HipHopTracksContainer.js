import React, { Component } from 'react'
import PresentationalTracks from '../PresentationalTracks'
import ProgressBar from '../ProgressBar'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class HipHopTracksContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstPlaylist: [],
      secondPlaylist: [],
      thirdPlaylist: [],
      fourthPlaylist: [],

      allTracks: [],
      allTracksWithDetails: [],
      filteredTracks: [],
      filteredTracksId: [],

      paceSelected: '',
      user: [],

      counter: 5,
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
    const userToken = this.props.params.access_token
    const rapCaviar = '37i9dQZF1DX0XUsuxWHRQd'
    const iLoveMy90sHipHop = '37i9dQZF1DX186v583rmzp'
    const mostNecessary = '37i9dQZF1DX2RxBh64BHjQ'
    const goldSchool = '37i9dQZF1DWVA1Gq4XHa6U'

    spotifyApi.getPlaylistTracks(userToken, rapCaviar)
    .then(response => this.setState({ firstPlaylist: response.items }, () => {
      spotifyApi.getPlaylistTracks(userToken, iLoveMy90sHipHop)
      .then(response => this.setState({ secondPlaylist: response.items }, () => {
        spotifyApi.getPlaylistTracks(userToken, mostNecessary)
        .then(response => this.setState({ thirdPlaylist: response.items }, () => {
          spotifyApi.getPlaylistTracks(userToken, goldSchool)
          .then(response => this.setState({ fourthPlaylist: response.items }, () => {
              this.setState({ allTracks: [...this.state.firstPlaylist, ...this.state.secondPlaylist, ...this.state.thirdPlaylist, ...this.state.fourthPlaylist]}, () => {
                this.setState({ allTracks: this.props.removeDupes(this.state.allTracks, 'track', 'id')}, () => {
                  this.getAudioFeatures()
                })
              })
          }))
        }))
      }))
    }))

    setTimeout(() => {
      this.setState({
        show: false
      })
    },((this.state.counter + 1) * 5000))
  }

  render() {
    return(
      <div>
        { this.state.show
          ?
          <ProgressBar counter={this.state.counter}/>
          :
          <div><p className="firstchoice-text"><div className="numbered-choices">2</div>Choose your desired running pace: {this.renderPaceDropdown(this.state.allTracksWithDetails)}</p>
          {this.renderCreatePlaylistButton()}</div>
        }
        {this.getAllTracks()}
        {this.addAllDuration()}
      </div>
    )
  }
}

export default HipHopTracksContainer
