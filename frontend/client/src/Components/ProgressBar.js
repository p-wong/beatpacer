import React, { Component } from 'react'
import { Line, Circle } from 'rc-progress'

class ProgressBar extends Component {
  state = {
    percent: 0,
    color: '#2ebd59'
  }

  componentDidMount = () => {
    const progressBarInterval = 50
    const increment = 100 / ((this.props.counter * 5000) / progressBarInterval)

    const progress = setInterval(() => {
      this.setState({
        percent: (this.state.percent + increment)
      })

      if (Math.ceil(this.state.percent) > 99) {
        clearInterval(progress)
      }
    }, progressBarInterval)
  }

  render() {
    const containerStyle = {
      width: '100%',
      marginBotton: '50px',
      marginTop: '50px',
      width: '70%',
      marginLeft: '15%'
    };
    return (
      <div style={containerStyle}>
        <Line percent={this.state.percent} strokeWidth="1" strokeColor={this.state.color} />
        <p className="progress-bar-text">Loading {this.props.filteredTracks.length > 0 ? this.props.filteredTracks.length : null} tracks from Spotify...<br/>{Math.ceil(this.state.percent)}%</p>
      </div>
    )
  }

}

export default ProgressBar
