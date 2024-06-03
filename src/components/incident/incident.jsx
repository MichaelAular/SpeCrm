import "./incident.scss";
import React, { useState } from "react";
import options from "../../../dropdownOptions.json";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";

export function Incident({ incident, index }) {
  const [incidentOpen, setIncidentOpen] = useState(false);

  return (
    <div
      className="incidentContainer"
      style={{
        height: incidentOpen ? "auto" : "28px",
        overflow: incidentOpen ? "visible" : "hidden",
      }}
    >
      <div className="incidentHeader"
            onClick={() => {setIncidentOpen(!incidentOpen)}}>
        <h6>
          {dayjs(incident.date).format('DD-MM-YYYY')}
        </h6>
        <div className="incidentButtonContainer">
          <button
            type="button"
            className="titlebarButton"
            style={{transform: incidentOpen && `rotate(180deg) translateY(6px)`}}
          >
            <ArrowUpIcon
              className="arrowUpIcon"
              size="16"
            />
          </button>
        </div>
      </div>
      <div className="incident_BarContainer">
        <Bar
          title="datum"
          name={"incidents." + index + ".date"}
          input={incident.date}
          type="date"
        />
        <Bar
          title="omschrijving"
          name={"incidents." + index + ".description"}
          input={incident.description}
          type="string_FH"
        />
        <Bar
          title="locatie"
          name={"incidents." + index + ".location"}
          input={incident.location}
          type="string"
        />
        <Bar
          title="betrokkenen"
          name={"incidents." + index + ".peopleInvolved"}
          input={incident.peopleInvolved}
          type="string_auto_mfs"
          options={options.employees}
        />
      </div>
    </div>
  );
}
