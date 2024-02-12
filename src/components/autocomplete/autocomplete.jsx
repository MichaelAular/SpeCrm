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
  setCurrentPage,
  setCurrentTab,
  }) {
  const [value, setValue] = useState(input);
  const [inputValue, setInputValue] = useState("");

  return (
      <Autocomplete
        disableClearable
        value={value}
        inputValue={inputValue}
        multiple={multi}
        freeSolo={fs}
        options={options}

        renderInput={(params) => <TextField {...params} sx={{minWidth: "200px"}} variant="outlined"/>}
        renderOption={(props, option) => <li {...props} key={option} >{option}</li>}
        renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={uuidv4()} label={option} /> ) }

        onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
        onChange={(event, newValue) => {
          setValue(newValue);
          setCurrentPage("Analyse");
          setCurrentTab("Profielschets");
          fullOptions.map((option)=> {option.label === newValue && setProfileID(option.id)})
        }}
      />
  );
}

