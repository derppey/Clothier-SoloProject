import React from 'react'
import SearchResults from './SearchResults'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { useState } from 'react';
import actions from '../redux/actions';


function MyCloset({user, searchVal, setSelectedItem}) {

  const [filter, setFilter] = useState('all');

  if(searchVal) return (
    <SearchResults></SearchResults>
  )
  const ADQitems = user.ADQs;
  if (ADQitems) {
  const filteredItems = filter === 'all' ? ADQitems : ADQitems.filter((item) => item.item.category === filter)
  console.log(filter, filteredItems);
  return (
    <div>
      MyCloset
      <div className="categories">
        <button className="cat" onClick={() => setFilter('all')} >All</button>
        {user.ADQs.map((item, index) =>
          <button className="cat" key={index} onClick={() => setFilter(item.item.category)} >{item.item.category}</button>
          )}
      </div>
      <div className="dashboardItems">
      {filteredItems.map((item, index) =>
        <div key={index}>
      <Link to="/itemDetail">
          <img src={item.item.image} onClick={() => setSelectedItem(actions.getSingleItem(item.item))} alt="n/a" />
      </Link>
        </div>
      )}
    </div>

    </div>
  )}
}

const mapStateToProps = ({store}) => {
  return {
    user: store.user,
    searchVal: store.searchVal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItem: (action) => dispatch(action)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCloset);


