import "./modal.scss";
import React, { useState } from "react";

export function Modal({ modalOpen, title }) {
  return (
    <div
      className="modalContainer"
      style={{
        backgroundColor: modalOpen
          ? "rgba(var(--TextOnWhite2), .8)"
          : "transparent",
      }}
    >
      <div className="modal" style={{ height: !modalOpen && "0px" }}>
        <div className="modalTitleBar">{title}</div>
      </div>
    </div>
  );
}
