import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faLocationDot,faBriefcase} from '@fortawesome/free-solid-svg-icons';
import './index.css'

const CompanyDetails = ({jobItems,skills,lifeAtCompany}) => {
    const {companyLogoUrl,websiteUrl,title,rating,location,employmentType,packagePerAnnum,jobDescription} = jobItems
    const {description,imageUrl} = lifeAtCompany
    // console.log(skills);
    return (
        <div className="job-container company-details">
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
                            <div className="salary-range-container">
                                <div className="location-jobtype-container c-location-jobtype">
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
                                    <div className='website-url-container'>
                                        <p>Description</p>
                                        <a href={websiteUrl} target="_blank" rel='noreferrer' className='anchor'>View Url</a>
                                    </div>
                                <p className='description'>{jobDescription}</p>
                            </div>
                            <div>
                                <h1>Skills</h1>
                                <ul className='skill-list-container'>
                                    {skills.map((eachSkill) => (
                                        <li className='skill'>
                                            <img src={eachSkill.imageUrl} alt={eachSkill.name} className='skill-logo'/>
                                            <p className='skill-name'>{eachSkill.name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='life-at-company-container'>
                                <div className='life-at-company-content'>
                                        <p className='life-at-company-title'>Life at Company</p>
                                        <p className='life-at-company-description'>{description}</p>
                                </div>
                                <img src={imageUrl} className='life-at-company-image'/>
                            </div>
                        </div>    
    )
}

export default CompanyDetails