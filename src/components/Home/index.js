import { Component } from 'react'
import {motion} from 'framer-motion'
// import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {isLoading : true}
  handleJobs = () => {
    const token = Cookies.get('jwt_token');
    if (token) {
      const {history} = this.props 
      history.push('/jobs')
    }
  }

  render (){
  /* const AccessToken = Cookies.get('jwt_token')
  if (!AccessToken) {
    return this.props.history.push('/login')
  } */
  return (
  <div className="home">
    <Header />
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  >
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
    </motion.div>
  </div>
  )
}
}

export default Home
