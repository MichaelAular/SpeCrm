import './dropdown.scss'
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export function DropdownBoolean({
    input,
    name,
    options,
    title,
    required
  }) {
  const [selectValue, setSelectValue] = useState(input)
  const handleChange = (event) => {
    event.target.value ? event.target.classList.remove("noneSelected") : event.target.classList.add("noneSelected")
    setSelectValue(event.target.value)
  };

  return (
    <select
      name={name}
      className={input === "" ? "select noneSelected" : "select"}
      value={selectValue}
      required={required}
      onChange={handleChange}
    >
      <option value={""} disabled >
        selecteer {title}
      </option>
      {options.map((option) => (
        <option value={option} key={uuidv4()}>
          {option}
        </option>
      ))}
    </select>
  );
}
