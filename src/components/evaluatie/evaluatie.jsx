import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";
require('dayjs/locale/nl')
import "./evaluatie.scss";

export function Evaluatie({ evaluatie }) {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const index = evaluatie.index
  evaluatie = evaluatie.evaluaties

  const dateObj = dayjs(evaluatie.date).locale("nl");

  const handleChange = () => {
    document.getElementById("unsavedChanges" + index).innerHTML = "(Wijzigingen niet opgeslagen)";
  };

  return (
    <div className="evaluatieContainer" style={{ height: incidentOpen ? "auto" : "28px", overflow: incidentOpen ? "visible" : "hidden", }}>
      <div className="evaluatieHeader" onClick={() => { setIncidentOpen(!incidentOpen) }}>
        <h6>
          {dateObj.format('dddd DD-MM-YYYY')} {!evaluatie.isNotSet && "(Ingevuld)"} {<span id={"unsavedChanges" + index} style={{color: "darkred"}}></span>}
        </h6>
        <div className="evaluatieButtonContainer">
          <button className="titlebarButton" style={{ transform: incidentOpen && `rotate(180deg) translateY(6px)` }}>
            <ArrowUpIcon className="arrowUpIcon" size="16" />
          </button>
        </div>
      </div>
      {incidentOpen && (
        <div className="evaluatie_BarContainer">
          <Bar title="Heeft het kind het huiswerk gemaakt en snapt het kind het huiswerk? Hoeveel foute antwoorden heeft het kind?"
          input={evaluatie.homework}
          name={index + "homework"}
          required={true}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Vertel iets over het gedrag van het kind: werkhouding/luisteren/concentratie/humeur"
          input={evaluatie.behaviour}
          name={index + "behaviour"}
          required={true}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Heeft het kind het leerdoel begrepen: vertel iets over de behandelde leerdoelen en waar het kind moeite mee heeft. Hoeveel fouten heeft het kind?"
          input={evaluatie.learningObjectives}
          name={index + "learningObjectives"}
          required={true}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Voortgezet Onderwijs: Vertel iets over de zelfstandigheid van het kind. Kan het kind de behandelde lesstof zelfstandig toepassen? Na 1 keer uitleggen of moet je het kind echt bij de hand nemen? (optioneel)"
          input={evaluatie.workingIndependently}
          name={index + "workingIndependently"}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Voortgezet Onderwijs: Welke vakken heeft het kind meegenomen? (optioneel)"
          input={evaluatie.voSubjects}
          name={index + "voSubjects"}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Hoevaak is de leerling absent geweest deze week? Hoevaak heeft de leerling zijn/haar boeken vergeten deze week (optioneel)"
          input={evaluatie.voBehaviour}
          name={index + "voBehaviour"}
          type="string"
          onChange={handleChange}
          />
          <Bar title="Zijn er verder nog bijzonderheden van belang? (optioneel)"
          input={evaluatie.remarks}
          name={index + "remarks"}
          type="string"
          onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
