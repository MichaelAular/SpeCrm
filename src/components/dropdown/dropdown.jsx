import './dropdown.scss'
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export function Dropdown({ input, options, title }) {
  const [selectValue, setSelectValue] = useState(input ? input : 'none')
  const handleChange = (event) => {setSelectValue(event.target.value)};

  return (
    <FormControl
      className="dropdown"
      variant="standard"
    >
      <Select
        className="select"
        value={selectValue}
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
