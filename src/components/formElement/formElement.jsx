import "./formElement.scss";
import React, { useState } from "react";
import { Add } from "@/assets/icons/add";
import { AddIncident } from "../addIncident/addIncident";
import { ArrowUpIcon } from "@/assets/icons/arrow_up";
import { Bar } from "../bar/bar";
import { Edit } from "@/assets/icons/edit";
import { Modal } from "../modal/modal";
import { Incident } from "../incidents/incidents";
import { v4 as uuidv4 } from "uuid";

export function FormElement({ elementTitle, elementBars, elementArray, add }) {
  const [addIncident, setAddIncident] = useState(false);
  const [addButtonHovered, setAddButtonHovered] = useState(false);
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
              onClick={() => {setEditElement(!editElement)}}
              onMouseEnter={() => {setEditHovered(true)}}
              onMouseLeave={() => {setEditHovered(false)}}
            >
              <Edit
                className="edit"
                color={editHovered || editElement? "rgb(var(--secundair))" : "rgb(var(--white06))"}
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
      {add && editElement && (
        <div className="addContainter">
          <button
            className="titlebarButton addButton"
            onMouseEnter={() => {setAddButtonHovered(true)}}
            onMouseLeave={() => {setAddButtonHovered(false)}}
            onClick={() => {setAddIncident(true)}}
          >
            <Add
              className="addIcon"
              color={addButtonHovered ? "rgb(var(--secundair))" : "rgb(var(--TextOnWhite))"}
              size="20px"
            />
          </button>
          <Modal
            modalOpen={addIncident}
            setModalOpen={setAddIncident}
            title="add incident"
            input={<AddIncident/>}
          />
        </div>
      )}
    </div>
  );
}
