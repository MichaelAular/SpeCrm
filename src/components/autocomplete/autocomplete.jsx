import "./autocomplete.scss"
import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { Chip }  from "@mui/material";
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from "uuid";

export function AutoComplete({
  options,
  fullOptions,
  input,
  multi,
  fs,
  setProfileID,
  profileID
  }) {
  const [value, setValue] = useState(input);
  const [inputValue, setInputValue] = useState("");

  return (
      <Autocomplete
        disableClearable
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          fullOptions.map((option)=> {option.label === newValue && setProfileID(option.id)})
          console.log(profileID)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
        multiple={multi}
        freeSolo={fs}
        options={options}
        renderInput={(params) => {
          return <TextField {...params} sx={{minWidth: "200px"}} variant="outlined"/>}}
        renderOption={(props, option) => {return (<li {...props} key={option} >{option}</li>)}}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip {...getTagProps({ index })}
              key={uuidv4()}
              label={option}
            />
          ))
        }}
      />
  );
}

