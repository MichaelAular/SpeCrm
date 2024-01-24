import "./formElement.scss";
import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrow_up";
import { Bar } from "../bar/bar";
import { EditIcon } from "@/assets/icons/edit";
import { EditIncident } from "../edit/edit";
import { Modal } from "../modal/modal";
import { Incident } from "../incidents/incidents";
import { v4 as uuidv4 } from "uuid";

export function FormElement({ elementTitle, elementBars, elementArray, add }) {
  const [editIncident, setEditIncident] = useState(false);
  const [elementHovered, setElementHovered] = useState(false);
  const [elementOpen, setElementOpen] = useState(true);
  const [editElement, setEditElement] = useState(false);
  const [editHovered, setEditHovered] = useState(false);

  return (
    <div className="formElement" style={{ height: !elementOpen && "35px" }}>
      <div className="elementTitle">
        <h3>{elementTitle}</h3>
        <div className="titlebarButtonContainer">
          {elementTitle === "incident registratie" && (
            <button
              className="titlebarButton editButton"
              onClick={() => {setEditIncident(true)}}
              onMouseEnter={() => {setEditHovered(true)}}
              onMouseLeave={() => {setEditHovered(false)}}
            >
              <EditIcon
                className="edit"
                color={editHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
                size="18"
              />
            </button>
          )}
          <button
            className="titlebarButton arrowButton"
            style={{transform: elementOpen && `rotate(180deg) translateY(4px)`}}
            onClick={() => {setElementOpen(!elementOpen)}}
            onMouseEnter={() => {setElementHovered(true)}}
            onMouseLeave={() => {setElementHovered(false)}}
          >
            <ArrowUpIcon
              className="arrowUpIcon"
              color={elementHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
              size="16"
            />
          </button>
        </div>
      </div>
      {elementBars &&
        elementBars.map((i) => (
          <Bar
            key={uuidv4()}
            title={i.title}
            input={i.input}
            type={i.type}
            options={i.options}
          />
        ))}
      {elementArray &&
        elementArray.map((incident) => (
          <Incident key={uuidv4()} incident={incident} editElement={editElement}/>
        ))}
          <Modal
            modalOpen={editIncident}
            setModalOpen={setEditIncident}
            title="Edit Incident"
            input={<EditIncident/>}
          />
    </div>
  );
}
