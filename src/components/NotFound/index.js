// import {Link} from 'react-router-dom'
import './index.css'

const  NotFound = () => {
    return (
        <div className="bg-not-found">
            <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png " alt='not found' />
            <h1 className="heading">Page Not Found</h1>
            <p className="description">We are sorry,the page you requested could not be found</p>
        </div>
    )
}
export default NotFound