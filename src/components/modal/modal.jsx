import "./modal.scss";
import React, { useState } from "react";
import { Close } from "@/assets/icons/close";

export function Modal({ modalOpen, setModalOpen, title, input}) {
  const [closeBtnHovered, setCloseBtnHovered]= useState(false);

  return (
    <div
      className="modalContainer"
      style={{
        backgroundColor: modalOpen ? "rgba(var(--TextOnWhite2), .8)" : "transparent",
        pointerEvents: modalOpen ? "all" : "none"
      }}
    >
      <div className="modal" style={{ height: !modalOpen && "0px", overflow: !modalOpen && "hidden"}}>
        <div className="modalTitleBar">
          <h3>{title}</h3>
          <button 
            onClick={()=>{setModalOpen(false)}}
            className="closeBtn"
            onMouseEnter={()=>{setCloseBtnHovered(true)}}
            onMouseLeave={()=>{setCloseBtnHovered(false)}}
          >
            <Close
              size="16"
              color={closeBtnHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white07))"}
            />
          </button>
        </div>
        <div className="modalInput">{input}</div>
      </div>
    </div>
  );
}
