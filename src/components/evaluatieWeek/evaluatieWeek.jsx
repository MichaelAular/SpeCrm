import "./evaluatieWeek.scss";
import React, { useState } from "react";
import { Dropdown } from "../dropdown/dropdown";

export function EvaluatieWeek({ setWeek, setYear, week, year }) {
    const options=[
        "week 1",
        "week 2",
        "week 3",
        "week 4",
        "week 5",
        "week 6",
    ]

  return (
    <div className="weekContainer prevent-select">
      <Dropdown
        options={options}
        input={week}
        title={"week"}
        name="week"
      />
    </div>
  );
}
