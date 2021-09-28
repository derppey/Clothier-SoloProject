import React from 'react'
import SearchResults from './SearchResults'
import { connect } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/app.css';
import apiService from '../apiServices';
import actions from '../redux/actions';

function UserCloset({selectedUser, searchVal, globalUser, setSelectedUser}) {
  const ADQitems = selectedUser.ADQs;
  const userCategories = [...new Set(selectedUser.ADQs.map((item) => item.item.category))];
  const initialState = userCategories.map(category => {return {category: category, isActive: ''}})
  
  const [all, setAll] = useState({category: 'all', isActive: 'is-active'});
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState(initialState);
  const [prevIndex, setPrevIndex] = useState(null)
  const [followed, setFollowed] = useState(globalUser.Follows.map((user) => user.userPrimaryKey));
  
  const { userId } = useParams();

  useEffect(() => {
    getUser(userId)
  }, []);

  async function getUser (itemId) {
    setSelectedUser(actions.setSelectedUser(await apiService.profile(itemId, 'id')));
  }


  function handleClick(cat, index) {
    setAll({...all, isActive:''})
    setFilter(cat.category);
    const newActive= [...categories];
    setPrevIndex(index);
    if (prevIndex !== null) newActive[prevIndex].isActive = '';
    newActive[index].isActive = 'is-active';
    setCategories(newActive);
  }

  function handleAllClick() {
    setFilter(all.category);
    setAll({...all, isActive:'is-active'})
    const newActive = [...categories];
    if (prevIndex !== null) newActive[prevIndex].isActive = '';
    setCategories(newActive);
  }

  const followUser = async (currentUserId) => {
    const res = await apiService.follow(globalUser.primaryKey, currentUserId);
    if (res.error) console.log('No user info found');
    setFollowed([...followed, currentUserId]);
  };


  if (ADQitems) {
    const filteredItems = filter === 'all' ? ADQitems : ADQitems.filter((item) => item.item.category === filter);
    const length = filteredItems.length;
    const quarter = length===1 ? 4 : Math.ceil(length/4);
    return (
      <div>
        {searchVal && 
          <div className="search">
            <SearchResults></SearchResults>
          </div>
        }
        <div className="body">

          <h1 className="title is-0 mt-5 ml-5 mb-0">{selectedUser.firstName}&apos;s Closet</h1>
          <div className="mt-2 ml-5">
            {followed.includes(selectedUser.primaryKey) 
                    ? <h6>Following</h6>
                    : <button className='button is-success is-rounded' onClick={() => followUser(selectedUser.primaryKey)}>Follow</button>
                  }
          </div>
          <div className="categories tabs">

            <ul>
            <li className={all.isActive} onClick={() => handleAllClick()}> <a>All</a> </li>
            {categories.map((category, index) =>
              <li className={category.isActive} key={index} onClick={() => handleClick(category, index)} ><a>{category.category}</a></li>
            )}
            </ul>
          </div>

          <div className="dashboardItems tile is-ancestor">
            <div className="tile is-3 is-vertical pt-2">
              {filteredItems.slice(0, quarter).map(item =>
                <div className='tile is-child box item-box' key={item.itemPrimaryKey}>
                  <Link to={`/itemDetail/${item.itemPrimaryKey}`}>
                    <img src={item.item.image} alt="n/a"/>
                  </Link>
            </div>
            )}
            </div>
            <div className="tile is-3 is-vertical">
              {filteredItems.slice(quarter, quarter*2).map(item =>
                <div className='tile is-child box item-box' key={item.itemPrimaryKey}>
                  <Link to={`/itemDetail/${item.itemPrimaryKey}`}>
                    <img src={item.item.image} alt="n/a"/>
                  </Link>
                </div>
              )}
            </div>
            <div className="tile is-3 is-vertical pt-3">
              {filteredItems.slice((quarter*2), quarter*3).map(item =>
                  <div className='tile is-child box item-box' key={item.itemPrimaryKey}>
                    <Link to={`/itemDetail/${item.itemPrimaryKey}`}>
                      <img src={item.item.image} alt="n/a"/>
                    </Link>
                  </div>
                )}
            </div>
            <div className="tile is-3 is-vertical">
              {filteredItems.slice((quarter*3)).map(item =>
                  <div className='tile is-child box item-box' key={item.itemPrimaryKey}>
                    <Link to={`/itemDetail/${item.itemPrimaryKey}`}>
                      <img src={item.item.image} alt="n/a"/>
                    </Link>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    )}
}

const mapStateToProps = ({store}) => {
  return {
    searchVal: store.searchVal,
    selectedUser: store.selectedUser,
    globalUser: store.user, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItem: (action) => dispatch(action),
    setSelectedUser: (action) => dispatch(action),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCloset);


