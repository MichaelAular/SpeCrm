import "./modal.scss";
import React, { useState } from "react";
import { CloseIcon } from "@/assets/icons/close";

export function Modal({ modalOpen, setModalOpen, title, input, noShade }) {
  const [closeBtnHovered, setCloseBtnHovered]= useState(false);

  return (
    <div
      className="modalContainer"
      style={{
        backgroundColor: modalOpen && noShade != true ? "rgba(var(--TextOnWhite2), .8)" : "transparent",
        pointerEvents: modalOpen ? "all" : "none",
      }}
    >
      <div className="modal" style={{
          height: !modalOpen && "0px",
          overflow: !modalOpen && "hidden",
          boxShadow: noShade && "-3px 3px 8px rgb(var(--TextOnWhite3))",
          }}>
        <div className="modalTitleBar">
          <h3>{title}</h3>
          <button
            type="button"
            onClick={()=>{setModalOpen(false)}}
            className="closeBtn"
            onMouseEnter={()=>{setCloseBtnHovered(true)}}
            onMouseLeave={()=>{setCloseBtnHovered(false)}}
          >
            <CloseIcon
              size="18"
              color={closeBtnHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white07))"}
            />
          </button>
        </div>
        <div className="modalInput">{input}</div>
      </div>
    </div>
  );
}
