import React, { Component } from 'react'
import PresentationalTracks from '../PresentationalTracks'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class ElectronicTracksContainer extends Component {
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
      user: []
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
    const freshElectronic = '37i9dQZF1DX8tZsk68tuDw'
    const trapMojito = '37i9dQZF1DX1OIMC8iDi74'
    const danceHits = '37i9dQZF1DX0BcQWzuB7ZO'
    const dancePartyHits = '5g32l3wrogaHcaz1CfN1fO'

    spotifyApi.getPlaylistTracks(userToken, freshElectronic)
    .then(response => this.setState({ firstPlaylist: response.items }, () => {
      spotifyApi.getPlaylistTracks(userToken, trapMojito)
      .then(response => this.setState({ secondPlaylist: response.items }, () => {
        spotifyApi.getPlaylistTracks(userToken, danceHits)
        .then(response => this.setState({ thirdPlaylist: response.items }, () => {
          spotifyApi.getPlaylistTracks(userToken, dancePartyHits)
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
  }

  render() {
    console.log(this.state.filteredTracksId)
    return(
      <div>
        {this.renderPaceDropdown(this.state.allTracksWithDetails)}
        {this.renderCreatePlaylistButton()}
        {this.getAllTracks()}
        {this.addAllDuration()}
      </div>
    )
  }
}

export default ElectronicTracksContainer