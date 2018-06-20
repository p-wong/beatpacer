import React from 'react'
import EachTrack from './EachTrack'
import 'semantic-ui-css/semantic.min.css'
import '../App.css';

class PresentationalTracks extends React.Component {
  renderTracks = () => {
    return (this.props.filteredTracks.map (t => {
      return <EachTrack name={t.track.name}
                        artists={t.track.artists.map(artist => artist.name)}
                        tempo={t.audioFeatures.tempo}
                        duration={t.track.duration_ms}
                        id={t.track.id}
                        convertMillisecondsToMinutes={this.props.convertMillisecondsToMinutes}
                        handlePlayPause={this.props.handlePlayPause}
                        playing={this.props.playing}
                        />
    }))
  }

  render() {
    return (
      <table id="table">
        <tbody>
          <tr>
            <th width="50%">Song Name</th>
            <th width="30%">Artist(s)</th>
            <th width="10%">Tempo (BPM)</th>
            <th width="10%">Duration (min)</th>
          </tr>
          {this.renderTracks()}
        </tbody>
      </table>
    )
  }
}

export default PresentationalTracks
