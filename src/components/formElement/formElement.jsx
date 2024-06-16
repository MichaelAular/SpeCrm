import "./formElement.scss";
import React, { useState, useEffect } from "react";
import { Aandacht } from "../aandacht/aandacht";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import { Incident } from "../incident/incident";
import { Evaluatie } from "../evaluatie/evaluatie";
import { Modal } from "../modal/modal";
import { v4 as uuidv4 } from "uuid";
import { AddIcon } from "@/assets/icons/add";

export function FormElement({
  elementArray,
  elementBars,
  elementTitle,
  currentProfile,
}) {
  const [elementOpen, setElementOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const isIncident = elementTitle === "incident registratie";
  const isAandacht = elementTitle === "aandachtspunten";

  const handleAddItem = () => {
    const newItem = {
      id: uuidv4(),
      date: new Date(),
      description: "",
      location: isIncident ? "" : undefined,
      peopleInvolved: isIncident ? [] : undefined,
      approach: !isIncident ? "" : undefined,
      agreements: !isIncident ? "" : undefined
    };
    setItems([...items, newItem]);
  };

  useEffect(() => {
    if (itemIdToDelete !== null) {
      if (isIncident) {
        currentProfile.incidents = currentProfile.incidents.filter((item, index) => index !== itemIdToDelete)
      }
      if (isAandacht) {
        currentProfile.attentionPoints = currentProfile.attentionPoints.filter((item, index) => index !== itemIdToDelete)
      }
      setItems(items.filter((item, index) => index !== itemIdToDelete));
      setItemIdToDelete(null)
    }
  }, [itemIdToDelete]);

  useEffect(() => {
    setItems(elementArray);
  }, [elementArray]);

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
          <button
            type='button'
            className="titlebarButton arrowButton"
            style={{ transform: elementOpen && `rotate(180deg) translateY(4px)` }}
            onClick={() => setElementOpen(!elementOpen)}
          >
            <ArrowUpIcon className="arrowUpIcon" size="16" />
          </button>
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
          {(elementTitle !== "evaluatie") &&
            <button
              type='button'
              className="titlebarButton arrowButton"
              style={{ transform: elementOpen && `rotate(180deg) translateY(4px)` }}
              onClick={() => { setElementOpen(!elementOpen) }}
              onMouseEnter={() => { setElementHovered(true) }}
              onMouseLeave={() => { setElementHovered(false) }}
            >
              <ArrowUpIcon
                className="arrowUpIcon"
                color={elementHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
                size="16"
              />
            </button>
          }
        </div>
      </div>
      {elementBars && elementBars.map((bar) => (
        <Bar
          input={bar.input}
          key={uuidv4()}
          name={bar.name}
          options={bar.options}
          title={bar.title}
          type={bar.type}
          required={bar.required}
        />
      ))}
      {(isIncident || isAandacht) && (
        <>
          {items.map((item, index) => (
            isIncident ? 
              <Incident
              key={uuidv4()}
              incident={item}
              index={index}
              setItemIdToDelete={setItemIdToDelete}
              /> :
              <Aandacht
              key={uuidv4()}
              punt={item}
              index={index}
              setItemIdToDelete={setItemIdToDelete}
              />
          ))}
          <button
            type="button"
            className="addBtn"
            onClick={handleAddItem}
          >
            <AddIcon size="20" />
          </button>
        </>
      )}
      

      <div>
        {elementArray && elementTitle === "evaluatie" &&
          elementArray.map((evaluatie) => <Evaluatie key={uuidv4()} evaluatie={evaluatie} />)
        }
      </div>

      <div>
        {elementArray && elementTitle === "evaluatie" &&
          elementArray.map((evaluatie) => <Evaluatie key={uuidv4()} evaluatie={evaluatie} />)
        }
      </div>

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