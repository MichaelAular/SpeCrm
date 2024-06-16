import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";
import "./evaluatie.scss";

export function Evaluatie({ evaluatie }) {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentHovered, setIncidentHovered] = useState(false);

  const dateObj = dayjs(evaluatie.date).locale("nl");
  const dayIsFilled = !evaluatie.isNotSet ? "(Ingevuld)" : "";

  return (
    <div className="evaluatieContainer" style={{ height: incidentOpen ? "auto" : "28px", overflow: incidentOpen ? "visible" : "hidden", }}>
      <div className="evaluatieHeader"
        onClick={() => { setIncidentOpen(!incidentOpen) }}
        onMouseEnter={() => { setIncidentHovered(true) }}
        onMouseLeave={() => { setIncidentHovered(false) }}
      >
        <h6 style={{ color: incidentHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))" }}>
          {dateObj.format('dddd DD-MM-YYYY')} {dayIsFilled}
        </h6>
        <div className="evaluatieButtonContainer">
          <button className="titlebarButton" style={{ transform: incidentOpen && `rotate(180deg) translateY(6px)` }}>
            <ArrowUpIcon className="arrowUpIcon" color={incidentHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"} size="16" />
          </button>
        </div>
      </div>
      <div className="evaluatie_BarContainer">
        <Bar title="Heeft het kind het huiswerk gemaakt en snapt het kind het huiswerk? Hoeveel foute antwoorden heeft het kind?" input={evaluatie.homework} required={true} type="string" />
        <Bar title="Vertel iets over het gedrag van het kind: werkhouding/luisteren/concentratie/humeur" input={evaluatie.behaviour} required={true} type="string" />
        <Bar title="Heeft het kind het leerdoel begrepen: vertel iets over de behandelde leerdoelen en waar het kind moeite mee heeft. Hoeveel fouten heeft het kind?" input={evaluatie.learningObjectives} required={true} type="string" />
        <Bar title="Voortgezet Onderwijs: Vertel iets over de zelfstandigheid van het kind. Kan het kind de behandelde lesstof zelfstandig toepassen? Na 1 keer uitleggen of moet je het kind echt bij de hand nemen?" input={evaluatie.workingIndependently} required={true} type="string" />
        <Bar title="Voortgezet Onderwijs: Vertel iets over de zelfstandigheid van het kind. Kan het kind de behandelde lesstof zelfstandig toepassen? Na 1 keer uitleggen of moet je het kind echt bij de hand nemen?" input={evaluatie.voSubjects} type="string" />
        <Bar title="Hoevaak is de leerling absent geweest deze week? Hoevaak heeft de leerling zijn/haar boeken vergeten deze week" input={evaluatie.voBehaviour} type="string" />
        <Bar title="Zijn er verder nog bijzonderheden van belang?" input={evaluatie.remarks} type="string" />
      </div>
    </div>
  );
}
