import React from 'react'
import SearchResults from './SearchResults'
import { connect } from 'react-redux';
import { useState } from 'react';
import apiService from '../apiServices';
import '../styles/app.css';
import { ExternalLink } from 'react-external-link';
import actions from '../redux/actions';
import { Link } from "react-router-dom";




function ItemDetail({searchVal, selectedItem, user, setSelectedItem, items}) {
  const [acquired, setAcquired] = useState(user.ADQs.map((item) => item.itemPrimaryKey))

  async function acquireItem () {
    await apiService.ADQ(user.primaryKey, selectedItem.primaryKey);
    setAcquired([...acquired, selectedItem.primaryKey]);
  }
  const userItems = user.ADQs.filter(item => item.item.category === selectedItem.category);
  const filteredItems = items.filter(item => item.category === selectedItem.category);
  
  return (
    <div className='content item'>
      {searchVal && 
      <div className="search">
      <SearchResults></SearchResults>
      </div>
      }
      <div className="box item-detail columns">
        <div className="column card">
          <img src={selectedItem.image} alt="n/a"/>
        </div>
        <div className="column card">
          <h1 className="title is-3">{selectedItem.title}</h1>
          <h1 className="title is-4">{selectedItem.category}</h1>
          <h1 className="title is-5">{selectedItem.brand}</h1>
          {acquired.includes(selectedItem.primaryKey)
          ? <h6 className='title is-6 m-2'>Added to MyCloset</h6>
          : <button className='button is-rounded is-success m-2' onClick={() => acquireItem()}>Add to MyCloset</button>
        }
          <ExternalLink href={selectedItem.productUrl}>
            <button className='button is-rounded is-success m-2'>Buy</button>
          </ExternalLink>
        </div>
      </div>

      <div className="box columns item-related">
        <div className="column card">
          <h1 className="title is-5">Similar clothes in your Closet:</h1>
          <div className='search-follow'>
            {userItems.map(item =>
              <div className='box search-item-box m-1' key={item.primaryKey}>
                <Link to="/itemDetail" onClick={() => setSelectedItem(actions.getSingleItem(item))}>
                  <img src={item.item.image} alt="n/a" />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="column card">
          <h1 className="title is-5">Other clothes in this Category:</h1>
          <div className='search-follow'>
            {filteredItems.map(item =>
              <div className='box search-item-box m-1' key={item.primaryKey}>
                <Link to="/itemDetail" onClick={() => setSelectedItem(actions.getSingleItem(item))}>
                  <img src={item.image} alt="n/a" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({store}) => {
  return {
    user: store.user,
    searchVal: store.searchVal,
    selectedItem: store.selectedItem,
    items: store.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItem: (action) => dispatch(action),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);


