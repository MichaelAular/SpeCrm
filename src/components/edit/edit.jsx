import "./edit.scss";
import React, { useState } from "react";
import { Aandacht } from "../aandacht/aandacht";
import { AddAandacht } from "../addAandacht/addAandacht";
import { AddIcon } from "@/assets/icons/add";
import { AddIncident } from "../addIncident/addIncident";
import { Delete } from "../delete/delete";
import { Incident } from "../incident/incident";
import { Modal } from "../modal/modal";
import { TrashIcon } from "@/assets/icons/trash";
import { v4 as uuidv4 } from "uuid";

export function Edit({ elementArray, type}) {
  const [addAandachtOpen, setAddAandachtOpen] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [addIncidentOpen, setAddIncidentOpen] = useState(false);
  const [deleteAandachtOpen, setDeleteAandachtOpen] = useState(false);
  const [deleteIncidentOpen, setDeleteIncidentOpen] = useState(false);

  const handleClickAdd =(type)=> {
    {type === "incident" && setAddIncidentOpen(true)}
    {type === "aandacht" && setAddAandachtOpen(true)}
  }
  const handleClickDelete =(type)=> {
    {type === "incident" && setDeleteIncidentOpen(true)}
    {type === "aandacht" && setDeleteAandachtOpen(true)}
  }

  const editIncident = (i) => {
    return (
      <div key={uuidv4()} className="editIncidentContainer" >
          <button
            type="button"
            className="trashBtn"
            onClick={()=>{handleClickDelete(type)}}
          >
            <TrashIcon size="20"/>
          </button>
          {type === "aandacht" && <Aandacht punt={i} />}
          {type === "incident" && <Incident incident={i} />}
      </div>
    );
  };

  return (
    <div className="editContainer">
      {elementArray && elementArray.map((i) => editIncident(i))}
      <button
            type="button"
        className="addBtn"
        onClick={()=>  {handleClickAdd(type)}}
        onMouseEnter={()=> {setAddHovered(true)}}
        onMouseLeave={()=> {setAddHovered(false)}}
      >
        <AddIcon
          size="20"
          color={addHovered ? "rgb(var(--secundair)" : "rgb(var(--TextOnWhite)"}
        />
      </button>
      <div style={{zIndex: "1000", position: "absolute", transform: "translate(Calc(-50vw + 245px), Calc(-50vh + 53px))"}}>
          <Modal
            modalOpen={addIncidentOpen}
            setModalOpen={setAddIncidentOpen}
            title="Add Incidenten"
            input={<AddIncident />}
            noShade
          />
          <Modal
            modalOpen={addAandachtOpen}
            setModalOpen={setAddAandachtOpen}
            title="Add Aandacht"
            input={<AddAandacht />}
            noShade
          />
          <Modal
            modalOpen={deleteIncidentOpen}
            setModalOpen={setDeleteIncidentOpen}
            title="Delete Incident"
            input={
              <Delete 
                setDeleteOpen={setDeleteIncidentOpen}
                type="incident"
              />}
            noShade
          />
          <Modal
            modalOpen={deleteAandachtOpen}
            setModalOpen={setDeleteAandachtOpen}
            title="Delete Aandacht"
            input={
              <Delete 
                setDeleteOpen={setDeleteAandachtOpen}
                type="aandacht"
              />}
            noShade
          />
        </div>
    </div>
  );
}
