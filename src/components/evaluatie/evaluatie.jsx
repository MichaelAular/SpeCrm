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
        <Bar title="Is het kind aanwezig? Zo nee: is het kind afgemeld?/ Is er contact geweest met ouders?" input={evaluatie.presence} type="string" />
        <Bar title="Is het kind op tijd? Zo nee: waarom niet?" input={evaluatie.onTime} type="string" />
        <Bar title="Heeft het kind huiswerk gemaakt? Zo nee: waarom niet?" input={evaluatie.homework} type="string" />
        <Bar title="VO: welke vakken heeft het kind meegenomen?" input={evaluatie.vo_subjects} type="string" />
        <Bar title="VO: Heeft het kind alle benodigde lesmaterialen mee? (denk aan boeken, schrijfgerei/laptop) Zo nee: waarom niet?" input={evaluatie.vo_lessonMaterial} type="string" />
        <Bar title="Heeft het kind een actieve werkhouding? (denk aan rechtop zitten/aandacht bij de les/proactief vragen stellen)" input={evaluatie.learningAttitude} type="string" />
        <Bar title="Luistert het kind naar de instructies van de begeleider?" input={evaluatie.followingInstructions} type="string" />
        <Bar title="Gedraagt het kind zich positief naar andere leerlingen?" input={evaluatie.behaviourToOthers} type="string" />
        <Bar title="Houdt het kind zijn/haar aandacht bij de les?" input={evaluatie.keepsAttention} type="string" />
        <Bar title="Gaat het kind zelfstandig aan het werk na de uitleg?" input={evaluatie.worksIndependently} type="string" />
        <Bar title="Stelt het kind vragen als hij/zij iets niet begrijpt?" input={evaluatie.askingQuestions} type="string" />
        <Bar title="Heeft het kind de behandelde lesstof goed begrepen? Zo nee: wat zijn de aandachtspunten?" input={evaluatie.understandingMaterial} type="string" />
        <Bar title="Is er iets opgevallen mbt het gedrag/welzijn van het kind? Denk aan te stil/boos/verdrietig/blij/opgewekt" input={evaluatie.behaviour} type="string" />
        <Bar title="Zijn er verder nog bijzonderheden van belang?" input={evaluatie.remarks} type="string" />
      </div>
    </div>
  );
}
