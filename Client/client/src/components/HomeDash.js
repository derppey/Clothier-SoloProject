import React from 'react'
import SearchResults from './SearchResults'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// import actions from '../redux/actions';


function HomeDash({searchToggle, setSearchToggle, items}) {

  if(searchToggle) return (
    <SearchResults setSearchToggle={setSearchToggle}></SearchResults>
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
        <div key={item.primaryKey.toString()}>
      <Link to="/itemDetail">
          <img src={item.image} alt="n/a" />
      </Link>
        </div>
      )}
    </div>
    </>
  )
}

const mapStateToProps = ({items}) => {
  return {
    items: items.items,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

export default connect(mapStateToProps)(HomeDash);

