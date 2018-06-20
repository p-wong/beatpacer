import React from 'react'
import { PlayButton, Icons } from 'react-soundplayer/components'
import { withSoundCloudAudio } from 'react-soundplayer/addons'
import Visualization from '../Visualization'


import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class EachTrack extends React.Component {

  render() {
    return (
      <tr>
        <td><button id="preview-button" onClick={() => {this.props.handlePlayPause(this.props.id)}}>{this.props.playing ? 'Stop' : 'Preview' }</button> {this.props.name}</td>
        <td>{this.props.artists}</td>
        <td>{Math.round(this.props.tempo)}</td>
        <td>{this.props.convertMillisecondsToMinutes(this.props.duration)}</td>
      </tr>
    )
  }
}

export default EachTrack
