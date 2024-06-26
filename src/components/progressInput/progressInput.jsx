import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { Bar } from "../bar/bar";
require('dayjs/locale/nl')

export function ProgressInput({ progresses }) {
    const [incidentOpen, setIncidentOpen] = useState(true);

    const handleChange = () => {
        document.getElementById(progresses.title).innerHTML = "(Wijzigingen niet opgeslagen)";
    };

    return (
        <div className="evaluatieContainer" style={{ height: incidentOpen ? "auto" : "28px", overflow: incidentOpen ? "visible" : "hidden", }}>
            <div className="evaluatieHeader" onClick={() => { setIncidentOpen(!incidentOpen) }}>
                <h6>
                    {progresses.title} {<span id={progresses.title} style={{ color: "darkred" }}></span>}
                </h6>
                <div className="evaluatieButtonContainer">
                    <button className="titlebarButton" style={{ transform: incidentOpen && `rotate(180deg) translateY(6px)` }}>
                        <ArrowUpIcon className="arrowUpIcon" size="16" />
                    </button>
                </div>
            </div>
            {incidentOpen && (
                <div className="evaluatie_BarContainer">
                    {progresses.fields.map((progress, index) =>
                        <div className="evaluatie_BarContainer" key={index}>
                            <Bar title={progress.title}
                                input={progress.value}
                                name={"progressMonitor." + progresses.name + "." + progress.name}
                                type={progress.type}
                                options={progress.options}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
