import React from 'react'
import NotesTitles from './notesTitles'

const Sidebar = () => {
  return (
    <div className='flex-1/5 max-w-48 border-r-1 border-neutral-800 min-h-lvh'>
      <h1 className='p-2'>Pages</h1>
      <div className='p-2'>
        <label className='input'>
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input className='search grow' placeholder='Search for notes'></input>
        </label>
      </div>
      <NotesTitles/>
      
    </div>
  )
}

export default Sidebar