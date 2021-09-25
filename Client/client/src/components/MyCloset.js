import React from 'react'
import SearchResults from './SearchResults'
import { connect } from 'react-redux';
// import actions from '../redux/actions';


function MyCloset({user, searchBool}) {
  
  if(searchBool) return (
    <SearchResults></SearchResults>
  )

  return (
    <div>
      MyCloset
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

export default connect(mapStateToProps, mapDispatchToProps)(MyCloset);


