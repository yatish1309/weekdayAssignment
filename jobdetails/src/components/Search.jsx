import React from 'react'

const Search = ({ placeholder, inputValue, handleInputValue }) => {
  return (
    <div className='w-[15rem] border border-solid border-[#ced4da] py-[13px] pl-[12px] pr-[26px]'>
      <input className='focus:outline-none' value={inputValue} onChange={handleInputValue} placeholder={placeholder} />
    </div>
  )
}

export default Search
