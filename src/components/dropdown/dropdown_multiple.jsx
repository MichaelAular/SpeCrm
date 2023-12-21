import './dropdown.scss'
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export function DropdownMultiple({ input, options, title }) {
  const [personName, setPersonName] = useState(input ? input.split(',') : ['none']);
  const handleChange = (event) => {
    event.target.value[0] === 'none' && event.target.value.shift()
    event.target.value[0] === undefined && event.target.value.push('none')
    const { target: { value } } = event;
    setPersonName( typeof value === 'string' ? value.split(',') : value );
  };

  return (
    <FormControl
      className="dropdown"
      variant="standard"
    >
      <Select
      multiple
        className="select"
        value={personName}
        onChange={handleChange}
        disableUnderline
      >
        <MenuItem value="none" disabled >
          <em className="noneSelected">
            selecteer {title}
          </em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option} key={uuidv4()}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
