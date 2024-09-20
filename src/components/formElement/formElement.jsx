import "./formElement.scss";
import React, { useState, useEffect } from "react";
import { Aandacht } from "../aandacht/aandacht";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import { Incident } from "../incident/incident";
import { Evaluatie } from "../evaluatie/evaluatie";
import { v4 as uuidv4 } from "uuid";
import { AddIcon } from "@/assets/icons/add";
import { ProgressInput } from "../progressInput/progressInput";
import Grid from '@mui/material/Grid';
import { UrenRegistratie } from "../urenRegistratie/urenRegistratie";
import { UrenRegistratieForm } from "../urenRegistratie/urenRegistratieForm";

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
        height: !elementOpen && "54px",
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
      {elementArray && elementTitle === "evaluatie" &&
        elementArray.map((evaluatie) => <Evaluatie key={uuidv4()} evaluatie={evaluatie} />)
      }
      {elementArray && elementTitle === "evaluatie" && <button type="submit"
          className="saveFormBtn">
          Opslaan
        </button>}
      {elementArray && elementTitle === "Uren overzicht" &&
        elementArray.map((urenRegistratie) => <UrenRegistratie key={uuidv4()} urenRegistratie={urenRegistratie} />)
      }
      {elementArray && elementTitle === "Uren registratie" &&
        <UrenRegistratieForm key={uuidv4()} />
      }
      {elementArray && elementTitle === "Leerling voortgang" &&
        <Grid container>
          {elementArray.map((progresses) =>
            <Grid item xs={12} md={6} key={uuidv4()}>
              <ProgressInput progresses={progresses} />
            </Grid>
          )}
        </Grid>
      }
      {elementArray && elementTitle === "Leerling voortgang" &&
        <button type="submit"
          className="saveFormBtn">
          Opslaan
        </button>
      }
    </div>
  );
}