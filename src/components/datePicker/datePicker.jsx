import "./datePicker.scss";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Datepicker({ input }) {
  const [startDate, setStartDate] = useState(new Date(input));

  return (
      <DatePicker
        className="datePicker"
        selected={startDate}
        dateFormat="dd-MM-yyyy"
        placeholderText="selecteer datum"
        onChange={(newDate) => setStartDate(newDate)}
      />
  );
}
