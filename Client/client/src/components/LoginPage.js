import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import apiService from '../apiServices';
// import auth from '../utils/auth';

const initialState = {
  email: '',
  password: '',
};

export default function LogIn({setAuthenticated}) {
  const [userLogin, setUserLogin] = useState(initialState);

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
    <div>
      <div>
      <h1>Log In: </ h1>
      <form onSubmit={handleSubmit}>
        <input type='text' required name='email' placeholder="Email" value={userLogin.email} onChange={handleEvent}/>
        <input type='password' required placeholder='Password' name='password' value={userLogin.password} onChange={handleEvent}/>
        <button className="button" type='submit'> Submit </button>
      </form>
      <button className="button" type='click'> Log In with Facebook </button>
      <button className="button" type='click'> Log In with Google </button>
      <Link to="/register">
      <button className="button" type='click'> Register! </button>
      </Link>

    </div>
    </div>
  )
}

