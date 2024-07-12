import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";
require('dayjs/locale/nl')
// import "./evaluatie.scss";

export function UrenRegistratie({ urenRegistratie }) {
  const [incidentOpen, setIncidentOpen] = useState(false);
  console.log(urenRegistratie)

  const index = urenRegistratie.index
  urenRegistratie = urenRegistratie.urenRegistraties

  const dateObj = dayjs(urenRegistratie.date).locale("nl");

  const handleChange = () => {
    document.getElementById("unsavedChanges" + index).innerHTML = "(Wijzigingen niet opgeslagen)";
  };

  return (
    <div className="evaluatieContainer" style={{ height: incidentOpen ? "auto" : "28px", overflow: incidentOpen ? "visible" : "hidden", }}>
      <div className="evaluatieHeader" onClick={() => { setIncidentOpen(!incidentOpen) }}>
        <h6>
          {dateObj.format('dddd DD-MM-YYYY')} {!urenRegistratie.isNotSet && "(Ingevuld)"} {<span id={"unsavedChanges" + index} style={{color: "darkred"}}></span>}
        </h6>
        <div className="evaluatieButtonContainer">
          <button className="titlebarButton" style={{ transform: incidentOpen && `rotate(180deg) translateY(6px)` }}>
            <ArrowUpIcon className="arrowUpIcon" size="16" />
          </button>
        </div>
      </div>
      {incidentOpen && (
        <div className="evaluatie_BarContainer">
          <Bar title="Starttijd"
          input={urenRegistratie.homework}
          name={index + "homework"}
          required={true}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Eindtijd"
          input={urenRegistratie.behaviour}
          name={index + "behaviour"}
          required={true}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Toelichting"
          input={urenRegistratie.learningObjectives}
          name={index + "learningObjectives"}
          required={true}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Gewerkt aan project"
          input={urenRegistratie.workingIndependently}
          name={index + "workingIndependently"}
          required={true}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Gewerkt aan product"
          input={urenRegistratie.voSubjects}
          name={index + "voSubjects"}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Gewerkt aan activiteit"
          input={urenRegistratie.voBehaviour}
          name={index + "voBehaviour"}
          type="string"
          onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
