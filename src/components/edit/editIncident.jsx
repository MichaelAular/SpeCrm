import "./edit.scss";
import React, { useState } from "react";
import { AddIcon } from "@/assets/icons/add";
import { AddIncident } from "../addIncident/addIncident";
import { Delete } from "../delete/delete";
import { Incident } from "../incident/incident";
import { Modal } from "../modal/modal";
import { TrashIcon } from "@/assets/icons/trash";
import { v4 as uuidv4 } from "uuid";

export function EditIncident({ elementArray }) {
  const [addOpen, setAddOpen] = useState(false);
  const [addHovered, setAddHovered] = useState(false);

  const editIncident = (incident) => {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
      <div key={uuidv4()}>
        <div className="editIncidentContainer" >
          <button
            type="button"
            className="trashBtn"
            onClick={()=>{setDeleteOpen(true)}}
          >
            <TrashIcon size="20"/>
          </button>
          <Incident incident={incident} />

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
      {elementArray && elementArray.map((incident) => editIncident(incident))}
      <button
        type="button"
        className="addBtn"
        onClick={()=> {setAddOpen(true)}}
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
            modalOpen={addOpen}
            setModalOpen={setAddOpen}
            title="Add Incidenten"
            input={<AddIncident />}
          />
        </div>
    </div>
  );
}
