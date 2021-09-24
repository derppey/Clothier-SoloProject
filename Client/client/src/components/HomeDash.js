import React from 'react'
import SearchResults from './SearchResults'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import actions from '../redux/actions';


function HomeDash({searchToggle, setSearchToggle, items}) {

  const mock = {
    title: 'testItem',
    category: 'jeans',
    image: "https://www.zappos.com/images/z/5/1/4/2/0/9/5142092-p-DETAILED.jpg"
  }

  if(searchToggle) return (
    <SearchResults setSearchToggle={setSearchToggle}></SearchResults>
  )
  return (
    <>
    <div className="categoryScroll">
      Categories:
    </div>
    <div className="dashboardItems">
      {items.title}
      <Link to="/itemDetail">
        <img src={items.image} alt="n/a" />
      </Link>
    </div>
    </>
  )
}

const mapStateToProps = ({items}) => {
  return {
    items: items.items[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDash);

