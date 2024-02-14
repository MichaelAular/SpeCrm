import "./edit.scss";
import React, { useState } from "react";
import { Aandacht } from "../aandacht/aandacht";
import { AddIcon } from "@/assets/icons/add";
import { AddAandacht } from "../addAandacht/addAandacht";
import { AddIncident } from "../addIncident/addIncident";
import { Delete } from "../delete/delete";
import { Incident } from "../incident/incident";
import { Modal } from "../modal/modal";
import { TrashIcon } from "@/assets/icons/trash";
import { v4 as uuidv4 } from "uuid";

export function Edit({ elementArray, type}) {
  const [addIncidentOpen, setAddIncidentOpen] = useState(false);
  const [addAandachtOpen, setAddAandachtOpen] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClick =(type)=> {
    {type === "incident" && setAddIncidentOpen(true)}
    {type === "aandacht" && setAddAandachtOpen(true)}
  }

  const editIncident = (i) => {
    return (
      <div key={uuidv4()}>
        <div className="editIncidentContainer" >
          <button
            className="trashBtn"
            onClick={()=>{setDeleteOpen(true)}}
          >
            <TrashIcon size="20"/>
          </button>
          {type === "aandacht" && <Aandacht punt={i} />}
          {type === "incident" && <Incident incident={i} />}

        </div>
        <div style={{zIndex: "1000", position: "absolute", transform: "translate(Calc(-50vw + 245px), Calc(-50vh + 53px))"}}>
          <Modal
            modalOpen={deleteOpen}
            setModalOpen={setDeleteOpen}
            title="Delete Incidenten"
            input={<Delete setDeleteOpen={setDeleteOpen}/>}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="editContainer">
      {elementArray && elementArray.map((i) => editIncident(i))}
      <button
        className="addBtn"
        onClick={()=>  {handleClick(type)}}
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
        </div>
    </div>
  );
}
