import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
class Home extends Component {
  state = {jwtToken : ''}
  handleJobs = () => {
    const token = Cookies.get('jwt_token');
    if (token !== '') {
      this.setState({ jwtToken: token });
    }
  }
  render (){
  const {jwtToken} = this.state
  if (jwtToken !== '') {
    return <Navigate to="/jobs" />;
  }
  return (
  <div className="home">
    <Header />
    <div className="home-content">
      <div className="content-text">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your abilities and potential
        </p>
        <button className='find-job-btn' onClick={this.handleJobs} type='submit'>Find Jobs</button>
      </div>
    </div>
  </div>
  )
}
}

export default Home
