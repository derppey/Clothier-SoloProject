import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import apiService from '../../apiServices';
import { connect } from 'react-redux';
import '../../styles/login.css';

const initialState = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  username: ''
}

interface props {
  setAuthenticated: Function,
  items: []
}

function Register({setAuthenticated, items}: props) {
  const [registryStep, setRegistryStep] = useState<Object>({
    step: 1,
  });
  const [newUser, setNewUser] = useState<{}>(initialState);
  const [tempIndex, setTempIndex] = useState<string>('');
  const [regSearchVal, setRegSearchVal] = useState<string>('');
  const [usersArr, setUsersArr] = useState<[]>([]);
  const [followed, setFollowed] = useState<[]>([]);
  
  
  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    setUsersArr(await apiService.getUsers());
  }

  const followUser = async (currentUserId) => {
    const res:void|Response = await apiService.follow(tempIndex, currentUserId);
    if (res.error) console.log('No user info found');
    setFollowed([...followed, currentUserId]);
  };
  
  const handleChange = (e:React.InputHTMLAttributes<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleChange2 = (e:React.InputHTMLAttributes<HTMLInputElement>) => {
    setRegSearchVal(e.target.value);
  };
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {...newUser};
    const res = await apiService.register(user);
    if (res.error) {
      alert(`${res.message}`);
      setNewUser(initialState);
    } else {
      setTempIndex(res.primaryKey);
      setRegistryStep(2);
    }
  };
  
  const LogInhandleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
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
  const filteredUsers = regSearchVal ? usersArr.filter((user:{}) => re.test(user.username)) : [];
  
  switch (registryStep) { 
    case 2:
      return (
        <div className='login-page is-flex is-justify-content-center'>
          <div className='login-window box'>
            <h1 className='title is-4'>
            Follow you friends before finishing up!
            </ h1>
            <div className="field has-addons">
              <div className="control">
                <input className="input is-rounded" type="text" placeholder="🔍 Search" value={regSearchVal} onChange={handleChange2}/>
              </div>
              <div className="control">
                <button className="button is-info is-rounded" type='click' onClick={() => {setRegistryStep(3)}} > Next </button>
              </div>
            </div>
            <div className='search-follow'>
            {filteredUsers.map(user =>
              <div className='box m-1' key={user.primaryKey}>
                <h4 className='title is-4'>{user.username}</h4>
                {followed.includes(user.primaryKey) 
                  ? <h6>Following</h6>
                  : <button className='button is-success is-rounded' onClick={() => followUser(user.primaryKey)}>Follow</button>
                }
              </div>
              )}
            </div>
          </div>
        </div>)
    case 3:
      return (
      <div>
        <div className='login-page is-flex is-justify-content-center'>
          <div className='login-window box'>
            <h1 className='title is-4'>
              Registration succesful!
            </ h1>
            <Link to="/">
              <button className="button is-success is-rounded" onClick={(e) => {LogInhandleSubmit(e)}}> Finish </button>
            </Link>
          </div>
        </div>
      </div>)
    default:
      return (
        <div className='login-page is-flex is-justify-content-center'>
          <div className='login-window box'>
            <h1 className='title is-2'>
          Welcome to Clothier!
            </ h1>
            <h1 className='title is-5'>
          Please follow these steps to begin:
            </ h1>
            <div className='field'>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="name@mail.com"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className='mt-1 input'
                />
                <input
                  type="text"
                  required
                  placeholder="Username"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  className='mt-1 input'
                />
                <input
                  type="password"
                  required
                  placeholder="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className='mt-1 input'
                />
                <input
                  type="text"
                  required
                  placeholder="Name"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleChange}
                  className='mt-1 input'
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleChange}
                  className='mt-1 input'
                />
                <button className="mt-4 button is-primary is-rounded" type='submit'> Next </button>
              </form>
            </div>
          </div>
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
