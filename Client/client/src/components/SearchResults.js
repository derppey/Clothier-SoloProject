import React from 'react'

export default function SearchResults({setSearchToggle}) {
  return (
    <div>
      Search Results here!
      <button className="button" type='click' onClick={()=>{setSearchToggle(false)}} > ❌</button>
    </div>
  )
}

