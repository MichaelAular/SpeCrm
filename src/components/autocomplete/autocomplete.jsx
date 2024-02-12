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
  label,
  multi,
  fs,
  setProfileID,
  setCurrentPage,
  setCurrentTab,
  type,
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

        renderOption={(props, option) => <li {...props} key={option} >{option}</li>}
        renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={uuidv4()} label={option} /> ) }
        renderInput={(params) => <TextField {...params}
          variant="outlined"
          sx={{
            minWidth: "200px",
            backgroundColor: type === "header" && "rgb(var(--TextOnWhite))",
            borderRadius: "3px",
            border: "none"
          }}
          // label={label}
        />}

        onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
        onChange={(event, newValue) => {
          setValue(newValue);
          type === "header" && setCurrentPage("Analyse");
          type === "header" && setCurrentTab("Profielschets");
          type === "header" && fullOptions.map((option)=> {option.label === newValue && setProfileID(option.id)})
        }}
      />
  );
}

