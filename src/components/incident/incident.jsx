import "./incident.scss";
import React, { useState } from "react";
import options from "../../../dropdownOptions.json";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import { useLeadingZero } from "@/hooks/leadingZero";

export function Incident({ incident }) {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentHovered, setIncidentHovered] = useState(false);
  const date = new Date(incident.date.toDate());
  const year = date.getFullYear();
  const month = useLeadingZero((date.getMonth() + 1), 2);
  const day = useLeadingZero(date.getDate(), 2);

  return (
    <div
      className="incidentContainer"
      style={{ 
        height: incidentOpen ? "auto" : "28px",
        overflow: incidentOpen ? "visible" : "hidden",
      }}
    >
      <div className="incidentHeader">
        <h6
          style={{color: incidentHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}}
        >
          {day}-{month}-{year}
        </h6>
        <div className="incidentButtonContainer">
          <button
            className="titlebarButton"
            style={{transform: incidentOpen && `rotate(180deg) translateY(6px)`}}
            onClick={() => {setIncidentOpen(!incidentOpen)}}
            onMouseEnter={() => {setIncidentHovered(true)}}
            onMouseLeave={() => {setIncidentHovered(false)}}
          >
            <ArrowUpIcon
              className="arrowUpIcon"
              color={incidentHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
              size="16"
            />
          </button>
        </div>
      </div>
      <div className="incident_BarContainer">
        <Bar title="datum" input={new Date(incident.date.toDate())} type="date" />
        <Bar title="omschrijving" input={incident.description} type="string_FH" />
        <Bar title="locatie" input={incident.location} type="string" />
        <Bar title="betrokkenen" input={incident.peopleInvolved} type="dropdown_multiple" options={options.employees}/>
      </div>
    </div>
  );
}
