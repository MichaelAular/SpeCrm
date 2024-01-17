import "./formElement.scss";
import React, { useState } from "react";
import { Add } from "@/assets/icons/add";
import { Arrow_Up } from "@/assets/icons/arrow_up";
import { Bar } from "../bar/bar";
import { Modal } from "../modal/modal";
import { Incident } from "../incidents/incidents";
import { v4 as uuidv4 } from "uuid";

export function FormElement({ elementTitle, elementBars, elementArray, add}) {
  const [addIncident, setAddIncident] = useState(false);
  const [addButtonHovered, setAddButtonHovered] = useState(false);
  const [elementHovered, setElementHovered] = useState(false);
  const [elementOpen, setElementOpen] = useState(true);

  return (
    <div className="formElement" style={{height: !elementOpen && "35px"}}>
      <div className="elementTitle">
        <h3>{elementTitle}</h3>
        <button
          className="titlebarButton arrowButton"
          style={{ transform: elementOpen === true && `rotate(180deg)` }}
          onClick={()=>{ setElementOpen(!elementOpen) }}
          onMouseEnter={()=>{setElementHovered(true)}}
          onMouseLeave={()=>{setElementHovered(false)}}
        >
          <Arrow_Up
            className="arrow_Up"
            color={elementHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
            size="16"
          />
        </button>
      </div>
      {elementBars && elementBars.map((i) => ( <Bar key={uuidv4()} title={i.title} input={i.input} type={i.type} options={i.options}/>))}
      {elementArray && elementArray.map((incident) => ( <Incident key={uuidv4()} incident={incident}/>))}
      { add === true &&
          <button
          className="titlebarButton addButton"
          onMouseEnter={()=>{setAddButtonHovered(true)}}
          onMouseLeave={()=>{setAddButtonHovered(false)}}
          onClick={()=>{setAddIncident(!addIncident)}}
          >
            {/* <Modal modalOpen={addIncident} title="add incident"/> */}
          <Add
            className="addIcon"
              color={addButtonHovered === true ? "rgb(var(--secundair))" : "rgb(var(--TextOnWhite))"}
            size="20px"
          />
          </button>
        }
    </div>
  );
}
