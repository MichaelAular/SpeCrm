import "./incidents.scss";
import React, { useState } from "react";
import { Arrow_Up } from "@/assets/icons/arrow_up";
import { Bar } from "../bar/bar";
import { useLeadingZero } from "@/hooks/leadingZero";
import options from "../../../dropdownOptions.json";


export function Incident({ incident }) {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentHovered, setIncidentHovered] = useState(false);
  const date = new Date(incident.date);
  const year = date.getFullYear();
  const month = useLeadingZero(date.getMonth(), 2);
  const day = useLeadingZero(date.getDate(), 2);


  return (
    <div
      className="incidentContainer"
      style={{ height: incidentOpen ? "auto" : "20px", overflow: "hidden" }}
      onClick={() => {setIncidentOpen(!incidentOpen)}}
      onMouseEnter={() => {setIncidentHovered(true)}}
      onMouseLeave={() => {setIncidentHovered(false)}}
    >
      <div className="incidentHeader">
        <h6
          style={{
            color:
              incidentHovered === true
                ? "rgb(var(--secundair))"
                : "rgb(var(--white06))",
          }}
        >
          {day}-{month}-{year}
        </h6>
        <div>
          <button
            className="titlebarButton"
            style={{ transform: incidentOpen === true && `rotate(180deg)` }}
          >
            <Arrow_Up
              className="arrow_Up"
              color={
                incidentHovered === true
                  ? "rgb(var(--secundair))"
                  : "rgb(var(--white06))"
              }
              size="10px"
            />
          </button>
        </div>
      </div>
      <div className="incident_BarContainer">
        <Bar title="datum" input={incident.date} type="date" />
        <Bar title="omschrijving" input={incident.description} type="string_FH" />
        <Bar title="locatie" input={incident.location} type="string" />
        <Bar title="betrokkenen" input={incident.peopleInvolved} type="dropdown_multiple" options={options.employes}/>
      </div>
    </div>
  );
}
