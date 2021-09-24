import React from 'react'
import SearchResults from './SearchResults'

export default function MyCloset({searchToggle, setSearchToggle}) {
  
  if(searchToggle) return (
    <SearchResults setSearchToggle={setSearchToggle}></SearchResults>
  )

  return (
    <div>
      MyCloset
    </div>
  )
}

