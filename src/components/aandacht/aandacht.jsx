import "./aandacht.scss";
import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";

export function Aandacht({ punt, index }) {
  const [aandachtOpen, setAandachtOpen] = useState(false);
  const [aandachtHovered, setAandachtHovered] = useState(false);

  return (
    <div
      className="aandachtContainer"
      style={{
        height: aandachtOpen ? "auto" : "28px",
        overflow: aandachtOpen ? "visible" : "hidden",
      }}
    >
      <div className="aandachtHeader"
            onClick={() => {setAandachtOpen(!aandachtOpen)}}
            onMouseEnter={() => {setAandachtHovered(true)}}
            onMouseLeave={() => {setAandachtHovered(false)}}>
        <h6 style={{color: aandachtHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}} >
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
              color={aandachtHovered ? "rgb(var(--secundair))" : "rgb(var(--white06))"}
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
      </div>
    </div>
  );
}
