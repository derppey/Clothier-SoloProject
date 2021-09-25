import React from 'react'
import { connect } from 'react-redux';
import actions from '../redux/actions';

function SearchResults({toggleSearch, user}) {
  return (
    <div>
      Search Results here!
      <button className="button" type='click' onClick={()=>{toggleSearch(actions.toggleSearchFalse())}} > ❌</button>
    </div>
  )
}

const mapStateToProps = ({store}) => {
  return {
    user: store.user,
    searchBool: store.searchBool
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSearch: (action) => dispatch(action),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);


