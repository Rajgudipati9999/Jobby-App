import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faLocationDot,faBriefcase} from '@fortawesome/free-solid-svg-icons';
import './index.css';

const SimilarJobItem = ({eachItem}) => {
    const {id,title,rating,location,jobDesription,comapanyLogoUrl,employmentType} = eachItem
    // console.log(eachItem);
    return (
        <li className='similar-jobs-list-item' key={id}>
            <div className="company-log-container">
                    <img className='company-logo-url' src={comapanyLogoUrl} alt={title}/>
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
            <div>
                <p>Description</p>
                <p>{jobDesription}</p>
            </div>
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
        </li>
    )
}
export default SimilarJobItem;