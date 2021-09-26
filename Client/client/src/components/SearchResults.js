import React from 'react'
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { useState, useEffect } from 'react';
import apiService from '../apiServices';
import { Link } from "react-router-dom";


function SearchResults({items, searchVal, user, setSearchVal, setSelectedItem}) {
  
  const [usersArr, setUsersArr] = useState([]);
  const [followed, setFollowed] = useState(user.Follows.map((user) => user.userPrimaryKey))
  const re = new RegExp(searchVal, 'i');
  
  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    setUsersArr(await apiService.getUsers());
  }
  
  const followUser = async (currentUserId) => {
    const res = await apiService.follow(user.primaryKey, currentUserId);
    if (res.error) console.log('No user info found');
    setFollowed([...followed, currentUserId]);
  };

  function setItem(item) {
    setSearchVal(actions.setSearchVal(''));
    setSelectedItem(actions.getSingleItem(item))
  }
  
  if (usersArr && items) {
    const filteredItems = items.filter((item) => re.test(item.category))
    const filteredUsers = usersArr.filter((user) => re.test(user.username))
    return (
      <div>
        <h1>Results:</h1>
        <div className="peopleSearch">
          <h2>People:</h2>
          {/* map through filtered users, i need name lastName and ID, with each map set a button to Follow */}
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
        <div className="itemsSearch">
          <h2>Items:</h2>
          {/* map through filtered items, i need name lastName and ID, with each map set a link te send to ItemPage */}
          {filteredItems.map(item =>
          <div key={item.primaryKey}>
            <Link to="/itemDetail" onClick={() => setItem(item)}>
              <img src={item.image} alt="n/a" />
            </Link>
          </div>
        )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({store}) => {
  return {
    searchBool: store.searchBool,
    items: store.items,
    searchVal: store.searchVal,
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchVal: (action) => dispatch(action),
    setSelectedItem: (action) => dispatch(action)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);


