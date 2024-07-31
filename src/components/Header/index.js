import { Navigate } from 'react'
import { useState } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {MdWork} from 'react-icons/md'
import {IoExitOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) => {
   const [isLogout,setLogoutStatus] = useState(false)
   const [isWebsiteLogo,setWebsiteLogo] = useState(false)
   console.log(props);
    const handleLogout = () => {
        setLogoutStatus(true)
        Cookies.remove('jwt_token')
    }
    const handleWebsiteLogo = () => {
      setWebsiteLogo(true)
    }
if (isLogout) {
  return props.history.push('/login')
}
if (isWebsiteLogo) {
 return props.history.push('/')
}
    return (
        <div>
            <nav className="navbar">
      <div className="logo">
       <button type='button' className='website-logo-button' onClick={handleWebsiteLogo}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </button>
      </div>
      <div className="nav-links">
        <Link to='/' className='link'>Home</Link>
        <Link to='/jobs' className='link'>Jobs</Link>
      </div>
      <div className="sm-display icon-container">
        <Link to='/'><FaHome className="icon" /></Link>
        <Link to='/jobs'><MdWork className="icon" /> </Link>
        <IoExitOutline className="icon" onClick={handleLogout}/>
      </div>
      <button className="logout" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </nav>
        </div>
    )
}

export default withRouter(Header); 