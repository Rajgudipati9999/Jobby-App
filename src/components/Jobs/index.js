import { Component } from "react";
import Cookies from 'js-cookie'
import Header from "../Header";
import './index.css'

class Jobs extends Component{
    state = {
        profile: null,
        error: null,
        isLoading: true,
      };
    componentDidMount() {
        this.fetchProfile();
      }
    
    fetchProfile = async () => {
        const jwtToken = Cookies.get('jwt_token');
        if (!jwtToken) {
          this.setState({ error: 'Unauthorized', isLoading: false });
          return;
        }
    
        const url = 'https://apis.ccbp.in/profile';
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };
    
        const response = await fetch(url, options);
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          this.setState({ profile: data.profile_details, isLoading: false });
        } else {
          this.setState({ error: 'Failed to fetch profile details', isLoading: false });
        }
    };
    render(){
        const {profile} = this.state
        console.log(profile)
        return (
            <>
            <Header />
            <div className="bg-jobs">
                    <div className="profile-container">
                        <div className="profile">
                            <h1 className="profile-heading">Rahul</h1>
                            <p className="profile-para">Lead Software Developer And AI-ML Expert</p>
                        </div>
                        <hr/>
                        <div>
                            <h1 className="employment-heading">Employment Type</h1>
                            <div>
                                <div className="check">
                                <input id='fulltime' className='check-box' type="checkbox"/>
                                <label htmlFor="fulltime">Full Time</label>
                                </div>
                                <div>
                                <input id='parttime' className='check-box' type="checkbox"/>
                                <label htmlFor="parttime">Part Time</label>
                                </div>
                                <div>
                                <input id="freelancer" className='check-box' type="checkbox"/>
                                <label htmlFor="freelancer">Freelance</label>
                                </div>
                                <div>
                                <input id="internship" className='check-box' type="checkbox"/>
                                <label htmlFor="internship">Internship</label>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <h1 className="salary-heading">Salary Range</h1>
                            <div>
                                <div>
                                <input id="10" className='check-box' type="radio" name="sal"/>
                                <label htmlFor="10">10 LPA and above</label>
                                </div>
                                <div>
                                <input id='20' className='check-box' type="radio" name="sal"/>
                                <label htmlFor="20">20 LPA and above</label>
                                </div>
                                <div>
                                <input id="30" className='check-box' type="radio" name="sal"/>
                                <label htmlFor="30">30 LPA and above</label>
                                </div>
                                <div>
                                <input id="40" className='check-box' type="radio" name="sal"/>
                                <label htmlFor="40">40 LPA and above</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="jobs-container">
                        <div>
                            <input type='search' className="search-input" placeholder="Search"/>
                        </div>
                        <div className="job-container">
                            <div className="company-log-container">
                                <span>Logo</span>
                                <div className="company-name-rating">
                                    <h3 className="com-name">Company</h3>
                                    <div className="rating">
                                        <i>Star</i>
                                        <span>4</span>
                                    </div>
                                </div>
                            </div>
                            <div className="salary-range-container">
                                <div className="location-jobtype-container">
                                    <div>
                                        <i>Location</i>
                                        <span>Location Name</span>
                                    </div>
                                    <div>
                                        <i>Job Type</i>
                                        <span>JobType Name</span>
                                    </div>
                                </div>
                                <div>
                                    <h2>Salary Range</h2>
                                </div>
                            </div>
                            <hr/>
                            <div className="job-description"> 
                                <h1>Description</h1>
                                <p>Content</p>
                            </div>
                        </div>
                    </div>
            </div>
            </>
        )
    }
}

export default Jobs 