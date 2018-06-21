import React from 'react'
import Visualization from '../Visualization'
import logo from '../style/spotify-logo-button.png'
import x from '../style/cancel.png'
import runner from '../style/running.png'




const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <div className="nav-container">
        <div className="nav-logo"><img src={logo} height="50px" width="50px"/></div>
        <div className="nav-logo nav-x"><img src={x} height="18px" width="18px"/></div>
        <div className="nav-logo"><img src={runner} height="50px" width="50px"/></div>
        { props.playing ? <Visualization audioFile={props.audioFile} /> : null }
        { props.params.access_token ? <button className="logout-button"><a href='http://localhost:3000'>Logout</a></button> : null }
      </div>
    </div>
  )
}

export default NavBar
