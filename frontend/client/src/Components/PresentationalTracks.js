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
      <table className="ui striped table large tableStyle">
        <tbody>
          <tr>
            <th>Song Name</th>
            <th>Artist(s)</th>
            <th>Tempo (BPM)</th>
            <th>Duration (min)</th>
          </tr>
          {this.renderTracks()}
        </tbody>
      </table>
    )
  }
}

export default PresentationalTracks
