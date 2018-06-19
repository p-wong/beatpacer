import React from 'react'

class TotalDuration extends React.Component {

  render() {
    return (
        <div>
          TOTAL DURATION: {this.props.convertMillisecondsToMinutes(this.props.addAllDuration())}
        </div>
    )
  }
}

export default TotalDuration
