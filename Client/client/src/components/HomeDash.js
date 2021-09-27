import React from 'react'
import SearchResults from'./SearchResults'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { useState } from 'react';
import '../styles/app.css';

function HomeDash({items, searchVal, setSelectedItem}) {
  
  const [filter, setFilter] = useState('all');
  
  if(!items) return (
    <div className="loading">Loading...</div>
    )

  const categories = ['Pants', 'Outerwear Pants and Sets', 'Coats & Outerwear', 'Hoodies & Sweatshirts', 'Sweaters', 'Shirts & Tops', 'Underwear & Intimates', 'Dresses', 'Jeans', 'Socks', 'Skirts', "Kids' Sets"]
  const filteredItems = filter === 'all' ? items : items.filter((item) => item.category === filter)
  return (
    <div>
      {searchVal && <SearchResults></SearchResults>}
      <div className="categories">
        <button className="cat" onClick={() => setFilter('all')} >All</button>
        {categories.map((item, index) =>
          <button className="cat" key={index} onClick={() => setFilter(item)} >{item}</button>
        )}
      </div>
      <div className="dashboardItems">
        {filteredItems.map(item =>
          <div key={item.primaryKey}>
        <Link to="/itemDetail">
            <img src={item.image} onClick={() => setSelectedItem(actions.getSingleItem(item))} alt="n/a"/>
        </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({store}) => {
  return {
    items: store.items,
    searchVal: store.searchVal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItem: (action) => dispatch(action)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDash);

