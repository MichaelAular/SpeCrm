import './dropdown.scss'
import React, { useState } from "react";

export function Dropdown({
    input,
    name,
    options,
    title,
    required,
    onChange
  }) {
  const [selectValue, setSelectValue] = useState(input == null ? "" : input)
  const handleChange = (event) => {
    onChange && onChange()
    const { value, classList } = event.target;
    classList.toggle('noneSelected', !value);
    setSelectValue(value);
  };

  return (
    <select
      name={name}
      className={`select ${selectValue === "" && 'noneSelected'}`}
      value={selectValue}
      required={required}
      onChange={handleChange}
    >
      <option value={""} disabled >
        Selecteer {title.toLowerCase()}
      </option>
      {options.map((option, index) => (
        <option value={typeof option === 'object' ? option.value : option} key={index}>
          {typeof option === 'object' ? option.description : option}
        </option>
      ))}
    </select>
  );
}
