import "./modal.scss";
import React, { useState } from "react";

export function Modal({ modalOpen, setModalOpen, title, input}) {
  return (
    <div
      className="modalContainer"
      style={{
        backgroundColor: modalOpen
          ? "rgba(var(--TextOnWhite2), .8)"
          : "transparent",
        pointerEvents: modalOpen
          ? "all"
          : "none"
      }}
      onClick={()=>{setModalOpen(false)}}
    >
      <div className="modal" style={{ height: !modalOpen && "0px" }}>
        <div className="modalTitleBar"><h3>{title}</h3></div>
        <div className="modalInput">{input}</div>
      </div>
    </div>
  );
}
