import "./aandacht.scss";
import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";

export function Aandacht({ punt }) {
  const [aandachtOpen, setAandachtOpen] = useState(false);
  const [aandachtHovered, setAandachtHovered] = useState(false);
  const dateObj = dayjs(punt.date.toDate()).locale('nl');

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
          {dateObj.format('DD-MM-YYYY')}
        </h6>
        <div className="aandachtButtonContainer">
          <button
            type="button"
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
