import {Component} from 'react'
// import {WithRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error_user: '',
    error_password: '',
    isAuthenticated : false ,
    credentialsError : '',
  }

  handleUsernameError = event => {
    if (event.target.value === '') {
      this.setState({ error_user: 'Required' });
    } else {
      this.setState({ error_user: '' });
    }
  }

  handlePasswordError = event => {
    if (event.target.value === '') {
      this.setState({ error_password: 'Required' });
    } else {
      this.setState({ error_password: '' });
    }
 }


  handleUsernameChange = event => {
    const { value } = event.target;
    this.setState({ username: value });

    if (value !== '') {
      this.setState({ error_user: '' });
    }
  }

  handlePasswordChange = event => {
    const { value } = event.target;
    this.setState({ password: value });

    if (value !== '') {
      this.setState({ error_password: '' });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { username, password } = this.state;
    if (username === '') {
      this.setState({ error_user: 'Required' });
    }
    if (password === '') {
      this.setState({ error_password: 'Required' });
    }

    const url = 'https://apis.ccbp.in/login'
    const data = {username,password}
    const options = {
      method : 'POST',
      body : JSON.stringify(data)
    }
    const response = await fetch(url,options)
    if (response.ok === true){
      this.setState({isAuthenticated : true})
      const jwt_token = 'v87653%%%vcvdbdfdfvd'
      Cookies.set('jwt_token' , jwt_token)
     // this.setState({jwt_token : jwt_token})
    }else{
      if (username === "" && password === ""){
        this.setState({credentialsError : 'Please Enter Username and Password'})
    }else {
      this.setState({credentialsError : '*username and password did not match'})
    }
    }
  }
  render() {
    const {error_user,error_password,isAuthenticated,credentialsError,jwt_token} = this.state 
    // console.log(jwt_token);
    if (isAuthenticated){
      return <Navigate to='/'/>
    }
    return (
      <div className="bg-container">
        <form onSubmit={this.handleSubmit} className="form-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleUsernameError}
              className="input"
              placeholder="Username"
            />
            <br/>
            <span className='error-msg'>{error_user}</span>
          </div>
          <div>
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              onBlur={this.handlePasswordError}
              className="input"
              placeholder="Password"
            />
            <br/>
            <span className='error-msg'>{error_password}</span>
          </div>
          <div>
            <button type="submit" className="button">
              Login
            </button>
          </div>
          <p className='error-msg'>{credentialsError}</p>
        </form>
      </div>
    )
  }
}

export default Login 
