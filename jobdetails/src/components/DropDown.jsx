import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'; 

const DropDown = ({inputName,inputValue, menuItems, handleInputValue}) => {
  return (
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">{inputName}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={inputValue}
    label={inputName}
    onChange={handleInputValue}
  >
    {menuItems?.map((itemName,index)=>{
      return (<MenuItem value={itemName} key={index}>{itemName}</MenuItem>)
    })}
  </Select>
</FormControl>
  )
}

export default DropDown
