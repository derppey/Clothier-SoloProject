import React from 'react'
import SearchResults from './SearchResults'

export default function ItemDetail({searchToggle, setSearchToggle}) {

  if(searchToggle) return (
    <SearchResults setSearchToggle={setSearchToggle}></SearchResults>
  )

  return (
    <div>
      Item Detail
    </div>
  )
}

