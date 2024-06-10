import "./aandacht.scss";
import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { TrashIcon } from "@/assets/icons/trash";
import { Modal } from "../modal/modal";
import { Delete } from "../delete/delete";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";

export function Aandacht({ punt, index, setItemIdToDelete }) {
  const [aandachtOpen, setAandachtOpen] = useState(false);
  const [deleteAandachtOpen, setDeleteAandachtOpen] = useState(false);

  return (
    <div
      className="aandachtContainer"
      style={{
        height: aandachtOpen ? "auto" : "28px",
        overflow: aandachtOpen ? "visible" : "hidden",
      }}
    >
      <div className="aandachtHeader"
            onClick={() => {setAandachtOpen(!aandachtOpen)}}>
        <h6>
          {dayjs(punt.date).format('DD-MM-YYYY')}
        </h6>
        <div className="aandachtButtonContainer">
          <button
            type="button"
            className="titlebarButton"
            style={{transform: aandachtOpen && `rotate(180deg) translateY(6px)`}}
          >
            <ArrowUpIcon
              className="arrowUpIcon"
              size="16"
            />
          </button>
        </div>
      </div>
      <div className="aandacht_BarContainer">
        <Bar
          title="datum"
          name={"attentionPoints." + index + ".date"}
          input={punt.date}
          type="date"
        />
        <Bar
          title="omschrijving"
          name={"attentionPoints." + index + ".description"}
          input={punt.description}
          type="string_FH"
        />
        <Bar
          title="plan van aanpak"
          name={"attentionPoints." + index + ".approach"}
          input={punt.approach}
          type="string_FH"
        />
        <Bar
          title="gemaakte afspraken"
          name={"attentionPoints." + index + ".agreements"}
          input={punt.agreements}
          type="string_FH"
        />
        <button
            type="button"
            className="trashBtn deleteBtn deleteBtn-danger"
            onClick={()=>{setDeleteAandachtOpen(true)}}
          >
            <TrashIcon size="20"/>
          </button>
      </div>
          <Modal
            modalOpen={deleteAandachtOpen}
            setModalOpen={setDeleteAandachtOpen}
            title="Aandacht verwijderen"
            input={
              <Delete 
                setDeleteOpen={setDeleteAandachtOpen}
                index={index}
                description="Weet u zeker dat u dit aandachtspunt wilt verwijderen?"
                setItemIdToDelete={setItemIdToDelete}
              />}
            noShade
          />
    </div>
  );
}
