import React from 'react'
import { PlayButton, Icons } from 'react-soundplayer/components'
import { withSoundCloudAudio } from 'react-soundplayer/addons'
import Visualization from '../Visualization'


import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class EachTrack extends React.Component {
  //
  // state = {
  //   playing: false,
  //   audioFile: ''
  // }

  // playSong = () => {
  //   spotifyApi.getTrack(this.props.id)
  //   .then(res => this.setState({audioFile: res.preview_url},() => {
  //     console.log(this.state.audioFile)
  //     let audio = new Audio()
  //     audio.src = this.state.audioFile
  //     audio.play()
  //   }))
  // }
  //
  // pauseSong = () => {
  //   this.setState({
  //     audioFile: ''
  //   }, () => console.log(this.state.audioFile))
  // }



  // handlePlayPause = () => {
  //   let audio = new Audio()
  //   spotifyApi.getTrack(this.props.id)
  //   .then(res => this.setState({ audioFile: res.preview_url },() => { audio.src = this.state.audioFile }))
  //
  //   this.setState({
  //     playing: !this.state.playing
  //   }, () => {
  //     this.state.playing ? audio.play() : audio.pause()
  //   })
  // }



  // playSong = () => {
  //   console.log("play")
  //   let audio = new Audio()
  //   this.setState({ playing: true }, () => {
  //     spotifyApi.getTrack(this.props.id)
  //     .then(res => this.setState({ audioFile: res.preview_url },() => { audio.src = this.state.audioFile }))
  //     audio.play();
  //   });
  // }
  //
  // pauseSong = () => {
  //   let audio = new Audio()
  //   console.log("pause");
  //   this.setState({ playing: false });
  //   audio.pause();
  // }



  render() {
    // console.log('state:' + this.state.playing)
    // console.log(this.state.audioFile)
    return (
      <tr>
        <td><button className="" onClick={() => {this.props.handlePlayPause(this.props.id)}}>{this.props.playing ? 'Pause' : 'Play' }</button> {this.props.name}</td>
        <td>{this.props.artists}</td>
        <td>{Math.round(this.props.tempo)}</td>
        <td>{this.props.convertMillisecondsToMinutes(this.props.duration)}</td>
      </tr>
    )
  }
}

export default EachTrack
