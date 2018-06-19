import React from 'react'
// import 'semantic-ui-css/semantic.min.css'
import Visualization from '../Visualization'



const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <div className="nav-container">
        <div className="nav-logo"><img src="https://image.flaticon.com/icons/svg/49/49097.svg" height="50px" width="50px"/></div>
        <div className="nav-title">Pace Maker</div>
        { props.playing ? <Visualization audioFile={props.audioFile} /> : null }
        { props.params.access_token ? <button className="logout-button"><a href='http://localhost:3000'>Logout</a></button> : null }
      </div>
    </div>
  )
}

export default NavBar
