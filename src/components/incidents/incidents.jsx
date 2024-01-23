import "./incidents.scss";
import React, { useState } from "react";
import options from "../../../dropdownOptions.json";
import { ArrowUpIcon } from "@/assets/icons/arrow_up";
import { Bar } from "../bar/bar";
import { TrashIcon } from "@/assets/icons/trash";
import { useLeadingZero } from "@/hooks/leadingZero";

export function Incident({ incident, editElement }) {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentHovered, setIncidentHovered] = useState(false);
  const [trashHovered, setTrashHovered] = useState(false);
  const date = new Date(incident.date.toDate());
  const year = date.getFullYear();
  const month = useLeadingZero(date.getMonth(), 2);
  const day = useLeadingZero(date.getDate(), 2);

  return (
    <div
      className="incidentContainer"
      style={{ height: incidentOpen ? "auto" : "28px", overflow: "hidden" }}
    >
      <div className="incidentHeader">
        <h6
          style={{
            color:
              incidentHovered === true || trashHovered === true
                ? "rgb(var(--secundair))"
                : "rgb(var(--white06))",
          }}
        >
          {day}-{month}-{year}
        </h6>
        <div className="incidentButtonContainer">
          {editElement === true && <button
            className="titlebarButton trashButton"
            // onClick={() => {}}
            onMouseEnter={() => {setTrashHovered(true)}}
            onMouseLeave={() => {setTrashHovered(false)}}
          >
            <TrashIcon
              className="trashIcon"
              color={ trashHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
            size="18"/>
          </button>}
          <button
            className="titlebarButton"
            style={{transform: incidentOpen === true && `rotate(180deg) translateY(6px)`}}
            onClick={() => {setIncidentOpen(!incidentOpen)}}
            onMouseEnter={() => {setIncidentHovered(true)}}
            onMouseLeave={() => {setIncidentHovered(false)}}
          >
            <ArrowUpIcon
              className="arrowUpIcon"
              color={incidentHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
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
