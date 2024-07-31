import React, { useState } from 'react';
// import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie';
// import { withRouter } from 'react-router-dom';
import './index.css';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isFetching,setIsFetching] = useState(false);
  const [credentialsError, setCredentialsError] = useState('');
  // const history = useHistory()
  // const token = Cookies.get('jwt_token')
  const handleUsernameError = (event) => {
    if (event.target.value === '') {
      setErrorUser('Required');
    } else {
      setErrorUser('');
    }
  };
  const handlePasswordError = (event) => {
    if (event.target.value === '') {
      setErrorPassword('Required');
    } else {
      setErrorPassword('');
    }
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);

    if (value !== '') {
      setErrorUser('');
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);

    if (value !== '') {
      setErrorPassword('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsFetching(true)
    if (username === '') {
      setErrorUser('Required');
    }
    if (password === '') {
      setErrorPassword('Required');
    }

    if (username !== '' && password !== '') {
      const url = '/login';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
          setIsAuthenticated(true);
          // console.log(props)
          const {history} = props
          history.push('/')
          // setIsFetching(true)
        } else {
          setCredentialsError('username or password did not match');
          // setIsFetching(true)
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setCredentialsError('Something went wrong. Please try again.');
      }
    }
  };

 /* if (isAuthenticated) {
    const AccessToken = Cookies.get('jwt_token')
    if (AccessToken.length !== 0) {
        return <Navigate to='/' />
    }
  } */ 
  return (
    <div className="bg-container">
      <form onSubmit={handleSubmit} className="form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <div>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <br/>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={handleUsernameError}
            className="input"
            placeholder="Username"
          />
          <br/>
          <span className='error-msg'>{errorUser}</span>
        </div>
        <div>
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <br/>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordError}
            className="input"
            placeholder="Password"
          />
          <br/>
          <span className='error-msg'>{errorPassword}</span>
        </div>
        <div>
          <button type="submit" className="button">
            Login
          </button>
        </div>
        <p className='error-msg'>{credentialsError}</p>
      </form>
    </div>
  );
};

export default Login;
