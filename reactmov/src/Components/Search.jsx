import React, { useState } from 'react'

function Search({search,setSearch}) {
    
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />
            <input type="text"
            placeholder='Search Through thousands of movies'
            value={search}
            onChange={(e)=>setSearch(e.target.value)} />
        </div>
    </div>
  )
}
export default Search