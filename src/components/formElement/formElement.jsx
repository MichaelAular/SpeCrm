import "./formElement.scss";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Arrow_Up } from "@/assets/icons/arrow_up";
import { Bar } from "../bar/bar";
import { Incident } from "../incidents/incidents";
import { Add } from "@/assets/icons/add";

export function FormEmelent({ elementTitle, elementBars, elementArray, add}) {
  const [elementOpen, setElementOpen] = useState(true);
  const [elementHovered, setElementHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);

  return (
    <div className="formElement" style={{height: !elementOpen && "35px"}}>
      <div className="elementTitle">
        <h3>{elementTitle}</h3>
        <div className="titlebarButtonContainer">
        {add === true &&
      <button
        className="titlebarButton"
        onMouseEnter={()=>{setAddHovered(true)}}
        onMouseLeave={()=>{setAddHovered(false)}}
        >
        <Add
          className="addIcon"
          color={addHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
          size="20px"
        />
      </button>
      }
        <button
          className="titlebarButton"
          style={{ transform: elementOpen === true && `rotate(180deg)` }}
          onClick={()=>{ setElementOpen(!elementOpen) }}
          onMouseEnter={()=>{setElementHovered(true)}}
          onMouseLeave={()=>{setElementHovered(false)}}
        >
          <Arrow_Up
            className="arrow_Up"
            color={elementHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
            size="16px"
          />
        </button>
        </div>
      </div>
      {elementBars && elementBars.map((i) => ( <Bar key={uuidv4()} title={i.title} input={i.input} type={i.type} options={i.options}/>))}
      {elementArray && elementArray.map((incident) => ( <Incident key={uuidv4()} incident={incident}/>))}
    </div>
  );
}
