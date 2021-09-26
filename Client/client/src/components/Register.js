import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import apiService from '../apiServices';
import { connect } from 'react-redux';


const initialState = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  username: ''
}

function Register({setAuthenticated, items}) {
  const [registryStep, setRegistryStep] = useState({
    step: 1,
  });
  const [newUser, setNewUser] = useState(initialState);
  const [tempIndex, setTempIndex] = useState('');
  const [regSearchVal, setRegSearchVal] = useState('');
  const [usersArr, setUsersArr] = useState([]);
  const [followed, setFollowed] = useState([]);
  
  
  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    setUsersArr(await apiService.getUsers());
  }

  const followUser = async (currentUserId) => {
    const res = await apiService.follow(tempIndex, currentUserId);
    if (res.error) console.log('No user info found');
    setFollowed([...followed, currentUserId]);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleChange2 = (e) => {
    setRegSearchVal(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {...newUser};
    const res = await apiService.register(user);
    if (res.error) {
      alert(`${res.message}`);
      setNewUser(initialState);
    } else {
      setTempIndex(res);
      console.log('registered', res, tempIndex);
      setRegistryStep(2);
    }
  };
  
  const LogInhandleSubmit = async (e) => {
    const { email, password } = newUser;
    const user = { email, password };
    const res = await apiService.login(user);
    
    if (res.error) {
      alert(`${res.message}`);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setAuthenticated(true);
    }
  }
  
  const re = new RegExp(regSearchVal, 'i');
  const filteredUsers = usersArr.filter((user) => re.test(user.username))
  
  switch (registryStep) { 
    case 2:
      return (
      <div>
        Follow you friends before finishing up!
        <button className="button" type='click' onClick={() => {setRegistryStep(3)}} > Next </button>
        <form>
          <input type="text" placeholder="🔍 Search" value={regSearchVal} onChange={handleChange2}/>
        </form>
        <div>
          {filteredUsers.map(user =>
            <div key={user.primaryKey}>
              <h4>{user.username}</h4>
              {followed.includes(user.primaryKey) 
                ? <h6>Following</h6>
                : <button onClick={() => followUser(user.primaryKey)}>Follow</button>
              }
            </div>
          )}
        </div>
      </div>)
    case 3:
      return (
      <div>
        Registration succesful, click to go to home (here excecute log in)
        <Link to="/">
          <button className="button" type='click' onClick={() => {LogInhandleSubmit()}}> Next </button>
        </Link>
      </div>)
    default:
      return (
        <div>
          Welcome to Clothier! <nl />
          Please follow these steps to begin:
        <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="name@mail.com"
              name="email"
              value={newUser.email}
              onChange={handleChange}
            />
            <input
              type="text"
              required
              placeholder="Username"
              name="username"
              value={newUser.username}
              onChange={handleChange}
            />
            <input
              type="password"
              required
              placeholder="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
            />
            <input
              type="text"
              required
              placeholder="Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
            />
  
            <button className="button" type='submit'> Next </button>
          </form>
        </div>)
  }
}

const mapStateToProps = ({store}) => {
  return {
    items: store.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
