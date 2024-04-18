import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import herologo from '../../Images/logo-no-background.png'
import './Navbar.css'
import menupng from '../../Images/menuimage.png'

export default function Navbar() {
  const [selected, setselected] = useState("Home")
  const [toggle , settoggle] = useState(true)

  function handleselected(value) {
    console.log('check out')
    setselected(value)
  }
  return (

    <div className="Navabarcont">
      <nav className="navitems">
        <Link to="/">
        <img src={herologo} alt="logo" className='imagelogo' /></Link>
        {toggle && (
          <ul>
            <li>
              <Link
                to="/"
                className={selected === 'Home' ? 'navlinks selected' : 'navlinks'}
                onClick={() => handleselected('Home')}
              >
                {' '}
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Images"
                className={selected === 'Images' ? 'navlinks selected' : 'navlinks'}
                onClick={() => handleselected('Images')}
              >
                Images
              </Link>
            </li>
            <li>
              <Link
                to="/Highlights"
                className={selected === 'Highlights' ? 'navlinks selected' : 'navlinks'}
                onClick={() => handleselected('Highlights')}
              >
                Highlights
              </Link>
            </li>
          </ul>
        )}
        <img className='menuimage' src={menupng} onClick={()=>{settoggle(!toggle)}}/>

      </nav>
    </div>

  )
}
