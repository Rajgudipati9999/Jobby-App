import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faStar,faLocationDot,faBriefcase} from '@fortawesome/free-solid-svg-icons';
import{Link} from 'react-router-dom'
import './index.css'

 const JobItem = ({jobDetails}) => {
    const [jobDetailItems , setJobDetails] = useState(jobDetails)
    const {      
        companyLogoUrl,
        employmentType,
        id,
        jobDescription,
        location,
        rating,
        title,
        packagePerAnnum
    } = jobDetailItems
    // console.log(jobDetailItems);
    return (
        <Link to={`/jobs/${id}`} className='job-item-link'>
            <li key={id}>
                <div className="job-container">
                            <div className="company-log-container">
                                <img className='company-logo-url' src={companyLogoUrl} alt={title}/>
                                <div className="company-name-rating">
                                    <p className="company-name">{title}</p>
                                    <div className="rating-container">
                                    <div className='star-container'>
                                        <FontAwesomeIcon icon={faStar} className='star'/>
                                    </div>
                                        <p className='rating'>{rating}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="salary-range-location-empoly-type-container">
                                <div className="location-jobtype-container">
                                    <div className='location-container'>
                                        <div className='icon-container'>
                                          <FontAwesomeIcon icon={faLocationDot} className='location-icon'/>
                                        </div>
                                        <p className='location'>{location}</p>
                                    </div>
                                    <div className='job-type-container'>
                                        <div className='icon-container'>
                                        <FontAwesomeIcon icon={faBriefcase} className='brief-case'/>
                                        </div>
                                        <p className='job-type'>{employmentType}</p>
                                    </div>
                                </div>
                                <div className='salary-range-container'>
                                    <p className='salary-range'>{packagePerAnnum}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="job-description-container"> 
                                    <div>
                                        <p>Description</p>
                                    </div>
                                <p className='description'>{jobDescription}</p>
                            </div>
                        </div>    
                    </li>
            </Link>
    )
 }

 export default JobItem 