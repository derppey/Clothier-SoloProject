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
interface ADQs {
  itemPrimaryKey: number,
  item: items
}


interface items {
  title: string, 
  category:string,
  image: string,
  primaryKey?:number,
  brand: string,
  productId: string, 
  productUrl: string
  item: items;
}
interface state  {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}
interface user  {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  userPrimaryKey: number
  primaryKey: number
  ADQs: ADQs[], 
  Followers: user[], 
  Follows: []
}
interface props {
  setAuthenticated: Function,
  user: user
}

function Register({setAuthenticated, user}: props) {
  const [registryStep, setRegistryStep] = useState<{}>({
    step: 1,
  });
  const [newUser, setNewUser] = useState<state>(initialState);
  const [tempIndex, setTempIndex] = useState<string>('');
  const [regSearchVal, setRegSearchVal] = useState<string>('');
  const [usersArr, setUsersArr] = useState<[]>([]);
  const [followed, setFollowed] = useState(user.Follows.map((user:user) =>  user.userPrimaryKey));
  
  
  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    setUsersArr(await apiService.getUsers());
  }

  const followUser = async (currentUserId: number) => {
    const res = await apiService.follow(tempIndex, currentUserId);
    if(res) {
      if (!res.ok ) console.log('No user info found');
      setFollowed([...followed, currentUserId]);
    }
  };
  
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleChange2 = (e:any) => {
    setRegSearchVal(e.target.value);
  };
  
  const handleSubmit = async (e:any) => {
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
  
  const LogInhandleSubmit = async (e:any) => {
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
  const filteredUsers:user[] = regSearchVal ? usersArr.filter((user:user) => re.test(user.username)) : [];
  
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
                <button className="button is-info is-rounded" onClick={() => {setRegistryStep(3)}} > Next </button>
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

const mapStateToProps = ({store}: any) => {
  return {
    user:store.user
  };
};

const mapDispatchToProps = (dispatch:any) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
