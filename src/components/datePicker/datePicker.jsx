import "./datePicker.scss";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Datepicker({ input, name }) {
  const [startDate, setStartDate] = useState(new Date(input));

  return (
      <DatePicker
        className="datePicker"
        selected={startDate}
        dateFormat="dd-MM-yyyy"
        placeholderText="selecteer datum"
        name={name}
        onChange={(newDate) => setStartDate(newDate.getTime())}
      />
  );
}
