import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {MdWork} from 'react-icons/md'
import {IoExitOutline} from 'react-icons/io5'

import './index.css'


const Header = () => {
   const [isLogout,setLogoutStatus] = useState(false)
    const handleLogout = () => {
        setLogoutStatus(true)
    }
if (isLogout) {
  return <Navigate to='/login'/>
}
    return (
        <div>
            <nav className="navbar">
      <div className="logo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </div>
      <div className="nav-links">
        <Link to='/'>Home</Link>
        <Link to='/jobs'>Jobs</Link>
      </div>
      
      <div className="sm-display icon-container">
        <FaHome className="icon" />
        <MdWork className="icon" />
        <IoExitOutline className="icon" />
      </div>
      <button className="logout" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </nav>
        </div>
    )
}

export default Header 