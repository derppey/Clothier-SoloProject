import React from 'react'
import SearchResults from './SearchResults'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import actions from '../redux/actions';


function HomeDash({items, searchVal, setSelectedItem}) {

  if(searchVal) return (
    <SearchResults></SearchResults>
  )
  if(!items) return (
    <div className="loading">Loading...</div>
  )
  return (
    <>
    <div className="categoryScroll">
      Categories:
    </div>
    <div className="dashboardItems">
      {items.map(item =>
        <div key={item.primaryKey}>
      <Link to="/itemDetail">
          <img src={item.image} onClick={() => setSelectedItem(actions.getSingleItem(item))} alt="n/a"/>
      </Link>
        </div>
      )}
    </div>
    </>
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

