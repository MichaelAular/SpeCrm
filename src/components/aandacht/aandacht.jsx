import "./aandacht.scss";
import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import { useLeadingZero } from "@/hooks/leadingZero";

export function Aandacht({ punt }) {
  const [aandachtOpen, setAandachtOpen] = useState(false);
  const [aandachtHovered, setAandachtHovered] = useState(false);
  const date = new Date(punt.date.toDate());
  const year = date.getFullYear();
  const month = useLeadingZero((date.getMonth() + 1), 2);
  const day = useLeadingZero(date.getDate(), 2);

  return (
    <div
      className="aandachtContainer"
      style={{
        height: aandachtOpen ? "auto" : "28px",
        overflow: aandachtOpen ? "visible" : "hidden",
      }}
    >
      <div className="aandachtHeader">
        <h6 style={{color: aandachtHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}} >
          {day}-{month}-{year}
        </h6>
        <div className="aandachtButtonContainer">
          <button
            className="titlebarButton"
            style={{transform: aandachtOpen && `rotate(180deg) translateY(6px)`}}
            onClick={() => {setAandachtOpen(!aandachtOpen)}}
            onMouseEnter={() => {setAandachtHovered(true)}}
            onMouseLeave={() => {setAandachtHovered(false)}}
          >
            <ArrowUpIcon
              className="arrowUpIcon"
              color={aandachtHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
              size="16"
            />
          </button>
        </div>
      </div>
      <div className="aandacht_BarContainer">
        <Bar title="datum" input={new Date(punt.date.toDate())} type="date" />
        <Bar title="omschrijving" input={punt.description} type="string_FH" />
        <Bar title="plan van aanpak" input={punt.approach} type="string_FH" />
        <Bar title="gemaakte afspraken" input={punt.agreements} type="string_FH" />
      </div>
    </div>
  );
}
