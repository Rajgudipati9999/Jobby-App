import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ThreeDots } from 'react-loader-spinner';
// import { Navigate } from 'react'
import Cookies from 'js-cookie';
import Header from "../Header";
import JobItem from "../JobItem";
import './index.css';
class Jobs extends Component {
  state = {
    profile: '',
    jobs:[],
    filteredJobs: [],
    isRetry: false,
    isLoading: true,
    jobListLoad: true,
    searchQuery: '',
    employmentTypes: [],
    salaryRange: '',
    profileError: false,
    jobsError: false,
    isSearchClicked :false
  };
  
  componentDidMount() {
    this.fetchProfile();
    this.fetchJobs();
  }

  convertToCamelCase = (data) => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
  });

  fetchProfile = async () => {
    const jwtToken = Cookies.get('jwt_token');
    const url = 'https://apis.ccbp.in/profile';
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      };
      if (response.ok) {
        this.setState({ profile: updatedProfileData, isLoading: false , profileError : false});
      }
    } catch (error) {
      console.log(error)
      this.setState({ profile: '', profileError: true, isLoading: false });
    }
  };
  
  fetchJobs = async () => {
    const jwtToken = Cookies.get('jwt_token');
    const { searchQuery, employmentTypes, salaryRange } = this.state;
    const employmentTypeQuery = employmentTypes.join(',');
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}&search=${searchQuery}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedJobs = data.jobs.map(job => this.convertToCamelCase(job));
        this.setState({ jobs: updatedJobs, filteredJobs : updatedJobs ,jobListLoad: false, jobsError: false });
      } 
    } catch (error) {
      console.log(error);
      this.setState({ jobsError: true, jobListLoad: false });
    }
  };

  handleEmploymentTypeChange = (event) => {
    const { value, checked } = event.target;
    this.setState(prevState => {
      let employmentTypes = [...prevState.employmentTypes];
      if (checked) {
        employmentTypes.push(value);
      } else {
        employmentTypes = employmentTypes.filter(type => type !== value);
      }
      const filteredJobs = prevState.jobs.filter(job =>
        employmentTypes.length === 0 || employmentTypes.includes(job.employmentType)
      );
      return { employmentTypes, filteredJobs };
    });
  };

  checkSalaryRange = (packagePerAnnum, salaryRange) => {
    const salary = parseInt(packagePerAnnum.split(' ')[0]);
    return salary >= parseInt(salaryRange);
  };

  handleSalaryRangeChange = (event) => {
    const salaryRange = event.target.value;
    this.setState(prevState => {
      const filteredJobs = prevState.jobs.filter(job =>
        (prevState.employmentTypes.length === 0 || prevState.employmentTypes.includes(job.employmentType)) &&
        this.checkSalaryRange(job.packagePerAnnum, salaryRange)
      );
      return { salaryRange, filteredJobs };
    });
  };

  handleSearchInputChange = (event) => {
      this.setState({searchQuery : event.target.value});
  }

  handleSearchClick = () => {
    // const {value} = event.target
    this.setState({isSearchClicked: true, jobListLoad: true }, () => {
      const { searchQuery, jobs } = this.state;
      const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
      this.setState({ filteredJobs, jobListLoad: false });
    });
  };

  handleRetry = () => {
      this.setState({isLoading : true} , this.fetchProfile)
  };

  handleJobsError = () => {
    this.setState({jobListLoad : true} , this.fetchJobs)
  }

  loaderView = () => {
    return (
      <div className="loader-container">
          <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="blue"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
      </div>
    )
  }

  jobsFailureView = () => {
    return (
      <div className="failure-view-container">
        <img className="failure-view-logo" src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view"/>
        <h2 className="failure-view-heading">Oops! Something Went Wrong</h2>
        <p className="failure-view-description">We cannot seem to find page your looking for</p>
        <button className="failure-view-btn" type="submit" onClick={this.handleJobsError}>Retry</button>
      </div>
    )
  }
  noJobsView = () => {
    return (
      <div className="no-jobs-container">
        <img className="no-jobs-img" src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' alt="no jobs"/>
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">We could not find any jobs. try other filters.</p>
      </div>
    )
  }

  render() {
    const { profile, filteredJobs, isLoading, jobListLoad,searchQuery, profileError, jobsError } = this.state;
    const { profileImageUrl, name, shortBio } = profile;
    console.log(profileError);
    /* const accessToken = Cookies.get('jwt_token')
    if (!accessToken){
      return this.props.history.push('/login')
    }*/ 

    return (
      <>
        <Header />
        <div className="bg-jobs">
         <div className="profile-container">
            <div className="search-input-container large-size">
               <input
                 type="search"
                 className="search-input"
                 placeholder="Search"
                 value={searchQuery}
                 onChange={this.handleSearchInputChange}
               />
               <div className="search-icon-container">
               <button type="button" className="search-icon-btn" onClick={this.handleSearchClick}>
                 <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
               </button>
               </div>
            </div>
            {isLoading ? (this.loaderView()) : (
              profileError ? (
                <div className="retry-btn-container">
                  <button className="retry-button" type="button" onClick={this.handleRetry}>Retry</button>
                </div>
              ) : (
                <div className="profile">
                  <img className="profile-logo" src={profileImageUrl} alt="profile-logo" />
                  <p className="profile-heading">{name}</p>
                  <p className="profile-para">{shortBio}</p>
                </div>
              )
            )}
            <hr className="line-break"/>
            <div>
              <h1 className="employment-heading">Employment Type</h1>
              <ul className="list">
                <li className="checkbox-container">
                  <input id="fulltime" className="check-box" type="checkbox" value="Full Time" onChange={this.handleEmploymentTypeChange} />
                  <label className="emp-label" htmlFor="fulltime">Full Time</label>
                </li>
                <li className="checkbox-container">
                  <input id="parttime" className="check-box" type="checkbox" value="Part Time" onChange={this.handleEmploymentTypeChange} />
                  <label className="emp-label" htmlFor="parttime">Part Time</label>
                </li>
                <li className="checkbox-container">
                  <input id="freelancer" className="check-box" type="checkbox" value="Freelance" onChange={this.handleEmploymentTypeChange} />
                  <label className="emp-label" htmlFor="freelancer">Freelance</label>
                </li>
                <li className="checkbox-container">
                  <input id="internship" className="check-box" type="checkbox" value="Internship" onChange={this.handleEmploymentTypeChange} />
                  <label className="emp-label" htmlFor="internship">Internship</label>
                </li>
              </ul>
            </div>
            <hr className="line-break"/>
            <div>
              <h1 className="salary-heading">Salary Range</h1>
              <ul className="list">
                <li className="sal-container">
                  <input id="10" className="sal-box" type="radio" name="sal" value="10" onChange={this.handleSalaryRangeChange} />
                  <label className="sal-label" htmlFor="10">10 LPA and above</label>
                </li>
                <li className="sal-container">
                  <input id="20" className="sal-box" type="radio" name="sal" value="20" onChange={this.handleSalaryRangeChange} />
                  <label className="sal-label" htmlFor="20">20 LPA and above</label>
                </li>
                <li className="sal-container">
                  <input id="30" className="sal-box" type="radio" name="sal" value="30" onChange={this.handleSalaryRangeChange} />
                  <label className="sal-label" htmlFor="30">30 LPA and above</label>
                </li>
                <li className="sal-container">
                  <input id="40" className="sal-box" type="radio" name="sal" value="40" onChange={this.handleSalaryRangeChange} />
                  <label className="sal-label" htmlFor="40">40 LPA and above</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="jobs-container">
            <div className="search-input-container small-size">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchQuery}
                onChange={this.handleSearchInputChange}
              />
              <div className="search-icon-container">
              <button type="button" className="search-icon-btn" onClick={this.handleSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
              </button>
              </div>
            </div>
            <ul className="job-list-container">
              {jobListLoad ?(this.loaderView()) : jobsError ? this.jobsFailureView(): filteredJobs.length === 0 ? this.noJobsView() : (
                filteredJobs.map(job => (
                    <JobItem key={job.id} jobDetails={job} />
                  ))
                )
              }
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Jobs;
