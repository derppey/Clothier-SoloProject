import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";


export default function LogIn() {
  const [userLogin, setUserLogin] = useState({
    Email: '',
    password: ''
  });

  const handleEvent = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userLogin)
    setUserLogin({
      Email: '',
      password: ''
    })
    // try {
    // await postTopic(newEvent);
    // setNewEvent({
    //   title: '',
    //   date: '',
    //   venue: '',
    // });
    // setChange(false);
    // } catch (error) {
    //  console.log('ERROR SUBMITING EVENT:', error);
    // }
  }

  return (
    <div>
      <div>
      <h1>Log In: </ h1>
      <form onSubmit={handleSubmit}>
        <input type='text' required={true} name='Email' placeholder="Email" value={userLogin.Email} onChange={handleEvent}/>
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

