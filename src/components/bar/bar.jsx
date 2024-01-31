import "./bar.scss";
import React, { useState } from "react";
import { Age } from "../age/age";
import { Dropdown } from "../dropdown/dropdown";
import { DropdownMultiple } from "../dropdown/dropdown_multiple";
import { Datepicker } from "../datePicker/datePicker";
import { useCapitalize } from "@/hooks/capitalize";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { v4 as uuidv4 } from "uuid";

// TODO: Set input as values, not placeholders and catch onChange events
// TODO: Save changes to profile object

export function Bar({ title, input, type, options }) {
  const input_Age = <Age input={input}/>;
  const input_Date = <Datepicker input={input}/>;
  const input_Dropdown = <Dropdown options={options} input={input} title={title}/>;
  const input_Dropdown_Boolean = <Dropdown options={["ja", "nee"]} input={input === true ? "ja" : "nee"} title={title}/>;
  const input_Dropdown_Multiple = <DropdownMultiple options={options} input={input} title={title}/>;
  const input_Empty = <input className="inputEmpty" placeholder={`vul ${title} in...`} />;
  const input_String = <input className="inputGiven" placeholder={input} />
  const input_String_auto= <FreeSolo options={options} input={input}/>
  const input_String_FH =()=> {
    const [inputString, setInputString] = useState(false);
    return (
      inputString ? <input className="inputEmpty" placeholder={input} /> :
      <div className="inputGiven" onClick={()=>setInputString(true)}>
        {input}
      </div>
    );
  }

  return (
    <div className="bar" style={{maxHeight: (type === "string_FH" || type === "string_auto" ) && input && "none"}}>
      <h5 className="barTitle">{useCapitalize(title)}</h5>

      {type === "age" && input && input_Age}
      {type === "date" && input && input_Date}
      {type === "dropdown" && input_Dropdown}
      {type === "dropdown_boolean" && input_Dropdown_Boolean}
      {type === "dropdown_multiple" && input_Dropdown_Multiple}
      {type === "string" && input &&  input_String}
      {type === "string" && !input && input_Empty}
      {type === "string_auto" && input && input_String_auto}
      {type === "string_FH" && input && input_String_FH()}
    </div>
  );
}

function FreeSolo({options, input}) {
  // console.log("input", input)
  // console.log("options", options)

  return (
    <Stack sx={{ width: "auto", marginLeft: "12px", marginRight: "6px"}}>
      <Autocomplete
        multiple
        freeSolo
        disableClearable
        // value={input}
        options={options}
        renderInput={(params) => <TextField {...params}/>}
      />
   </Stack>
  );
}
