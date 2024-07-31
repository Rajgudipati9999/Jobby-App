import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import Header from '../Header';
import SimilarJobItem from '../SimilarJobItem';
import CompanyDetails from '../CompanyDetails';
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobItems: null,
    skills: null,
    lifeAtCompany: null,
    similarJobList: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.fetchJobDetails();
  }

  convertToCamelCase = (details) => ({
    description: details.description,
    imageUrl: details.image_url,
  });

  convertSkillToCamelCase = (skill) => ({
    name: skill.name,
    imageUrl: skill.image_url,
  });

  convertSimilarJobsIntoCamelCase = (similarJob) => ({
    companyLogoUrl: similarJob.company_logo_url,
    employmentType: similarJob.employment_type,
    id: similarJob.id,
    jobDescription: similarJob.job_description,
    location: similarJob.location,
    rating: similarJob.rating,
    title: similarJob.title,
  });

  fetchJobDetails = async () => {
    const {match} = this.props 
    const {id} = match.params
    console.log(match);
    // const { id } = this.props.match.params;
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch job details');
      const data = await response.json();

      const similarJobs = data.similar_jobs.map(this.convertSimilarJobsIntoCamelCase);
      const lifeAtCompanyData = this.convertToCamelCase(data.job_details.life_at_company);
      const skillsData = data.job_details.skills.map(this.convertSkillToCamelCase);
      const remainData = {
        companyLogoUrl: data.job_details.company_logo_url,
        websiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        title: data.job_details.title,
        rating: data.job_details.rating,
      };

      this.setState({
        jobItems: remainData,
        skills: skillsData,
        lifeAtCompany: lifeAtCompanyData,
        similarJobList: similarJobs,
        loading: false,
        error: false,
      });
    } catch (err) {
      this.setState({
        jobItems: null,
        skills: null,
        lifeAtCompany: null,
        loading: false,
        error: true,
      });
    }
  };

  loadingView = () => (
    <div className='loader-container'>
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
  );

  handleJobsError = () => {
    this.fetchJobDetails();
  };

  jobsFailureView = () => (
    <div className="failure-view-container">
      <img className="failure-view-logo" src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">We cannot seem to find page your looking for</p>
      <button className="failure-view-btn" type="submit" onClick={this.handleJobsError}>Retry</button>
    </div>
  );

  render() {
    const { jobItems, skills, lifeAtCompany, similarJobList, loading, error } = this.state;
    const accessToken = Cookies.get('jwt_token');

    if (!accessToken) {
      return this.props.history.push('/login');
    }

    return (
      <div>
        <Header />
        {loading ? this.loadingView() : error ? this.jobsFailureView() :
          <div className='job-item-details-container'>
            <div className='company-details-container'>
              <CompanyDetails jobItems={jobItems} skills={skills} lifeAtCompany={lifeAtCompany} />
            </div>
            <div>
              <h1 className='similar-jobs-heading'>Similar Jobs</h1>
              <ul className='similar-jobs-list'>
                {similarJobList.map((eachItem) => (
                  <SimilarJobItem key={eachItem.id} eachItem={eachItem} />
                ))}
              </ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default (JobItemDetails);