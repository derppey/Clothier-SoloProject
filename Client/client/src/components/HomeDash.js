import React from 'react'
import SearchResults from './SearchResults'
import { Link } from "react-router-dom";

export default function HomeDash({searchToggle, setSearchToggle}) {

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
      <Link to="/itemDetail">
        <img src={mock.image} alt="n/a" />
      </Link>
    </div>
    </>
  )
}

