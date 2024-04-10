import "./formElement.scss";
import React, { useState } from "react";
import { Aandacht } from "../aandacht/aandacht";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import { Edit } from "../edit/edit";
import { EditIcon } from "@/assets/icons/edit";
import { Incident } from "../incident/incident";
import { Modal } from "../modal/modal";
import { v4 as uuidv4 } from "uuid";

export function FormElement({
  elementArray,
  elementBars,
  elementTitle,
}) {
  const [editAandacht, setEditAandacht] = useState(false);
  const [editIncident, setEditIncident] = useState(false);
  const [elementHovered, setElementHovered] = useState(false);
  const [elementOpen, setElementOpen] = useState(true);
  const [editHovered, setEditHovered] = useState(false);

  return (
    <div
      className="formElement"
      style={{
        height: !elementOpen && "35px",
        overflow: elementOpen ? "visible" : "hidden"
      }}
      >
      <div className="elementTitle">
        <h3>{elementTitle}</h3>
        <div className="titlebarButtonContainer">
          {(elementTitle === "incident registratie" || elementTitle === "aandachtspunten") && (
            <button
              type='button'
              className="titlebarButton editButton"
              onClick={() => {
                elementTitle === "incident registratie" && setEditIncident(true)
                elementTitle === "aandachtspunten" && setEditAandacht(true)
              }}
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
            type='button'
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
      { elementBars &&
        elementBars.map((i) => (
          <Bar
            input={i.input}
            key={uuidv4()}
            name={i.name}
            options={i.options}
            title={i.title}
            type={i.type}
          />
          ))
      }
      { elementArray && elementTitle === "incident registratie" &&
        elementArray.map((incident) => <Incident key={uuidv4()} incident={incident}/>)
      }
      { elementArray && elementTitle === "incident registratie" &&
        <Modal
          modalOpen={editIncident}
          setModalOpen={setEditIncident}
          title="Edit Incidenten"
          input={<Edit elementArray={elementArray} type="incident"/>}
        />
      }

      { elementArray && elementTitle === "aandachtspunten" &&
        elementArray.map((punt) => <Aandacht key={uuidv4()} punt={punt}/>)
      }
      { elementArray && elementTitle === "aandachtspunten" &&
        <Modal
          modalOpen={editAandacht}
          setModalOpen={setEditAandacht}
          title="Edit Aandachtspunten"
          input={<Edit elementArray={elementArray} type="aandacht"/>}
        />
      }
    </div>
  );
}
