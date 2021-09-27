import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import apiService from '../apiServices';
import '../styles/login.css';

const initialState = {
  email: '',
  password: '',
};


export default function LogIn({setAuthenticated}) {
  const [userLogin, setUserLogin] = useState(initialState);
  const Logo = '../utils/ClothierWideRed';
  
  const handleEvent = (e) => {
    const { name, value } = e.target;
    setUserLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userLogin;
    const user = { email, password };
    const res = await apiService.login(user);
    
    if (res.error) {
      alert(`${res.message}`);
      setUserLogin(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setAuthenticated(true);
    }
  }

  return (
    <div className='login-page is-flex is-justify-content-center'>
      <div className='login-window box'>
        <img src={Logo} alt="n/a"/>
        <h1 className='title is-2'>Welcome to Clothier!</ h1>
        <div className="field">
          <form onSubmit={handleSubmit}>
            <input className='mt-1 input' type='text' required name='email' placeholder="Email" value={userLogin.email} onChange={handleEvent}/>
            <input className='mt-5 input' type='password' required placeholder='Password' name='password' value={userLogin.password} onChange={handleEvent}/>
            <button className="mt-5 button is-primary" type='submit'> Log In </button>
          </form>
          {/* <button className="button" type='click'> Log In with Facebook </button>
          <button className="button" type='click'> Log In with Google </button> */}
          <h1 className='mt-3 title is-5'>New to Clothier?</ h1>
          <Link to="/register">
          <button className="mt-0 button is-link" type='click'> Register! </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

