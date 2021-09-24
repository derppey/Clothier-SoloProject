import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";



export default function Register({setAuthenticated}) {
  const [registryStep, setRegistryStep] = useState({
    step: 1,
  });
  switch (registryStep) {
    case 2:
      return (
      <div>
        Register Form Step 2
        <button className="button" type='click' onClick={() => {setRegistryStep(3)}} > Next </button>
      </div>)
    case 3:
      return (
      <div>
        Register Form Step 3
        <button className="button" type='click' onClick={() => {setRegistryStep(4)}} > Next </button>
      </div>)
    case 4:
      return (
      <div>
        Registration succesful, click to go to home (here auth must me set to true)
        <Link to="/">
          <button className="button" type='click' onClick={() => {setAuthenticated(true)}}> Next </button>
        </Link>
      </div>)
    default:
      return (
        <div>
        Register Form Step 1
        <button className="button" type='click' onClick={() => {setRegistryStep(2)}} > Next </button>
      </div>
      )
  };
};
