import "./autocomplete.scss"
import React, { useState, useEffect } from "react";
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
  profileID
  }) {
    const [value, setValue] = useState(input);
    const [inputValue, setInputValue] = useState("");
    const useEffectChange =()=> {
      for (let i=0; i < fullOptions.length; i++) {
        fullOptions[i].id === profileID && handleChange(fullOptions[i].label)
      }
    }
    const handleChange = (newValue) => {
      setValue(newValue);
      type === "header" && setCurrentPage("Analyse");
      type === "header" && setCurrentTab("Profielschets");
      type === "header" && fullOptions.map((option)=> {option.label === newValue && setProfileID(option.id)})
    }

    useEffect(()=>{
      profileID !== null && fullOptions !== undefined && useEffectChange()
    },[profileID]);

    return (
        <Autocomplete
          disableClearable
          freeSolo={fs}
          inputValue={inputValue}
          multiple={multi}
          options={options}
          value={value}

          renderOption={(props, option) => <li {...props} key={option} >{option}</li>}
          renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={uuidv4()} label={option} /> ) }
          renderInput={(params) => <TextField {...params}
            variant="outlined"
            label= {profileID === null ? `geef ${label} in` : `${label}`}
            sx={{
              minWidth: "200px",
              backgroundColor: type === "header" && "rgb(var(--TextOnWhite))",
              borderRadius: "3px",
              border: "none"
            }}
          />}

          onChange={(event, newValue) => {handleChange(newValue)}}
          onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
        />
    );
}

