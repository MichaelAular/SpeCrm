import "./urenRegistratie.scss";
import React from "react";
import options from "../../../dropdownOptions.json";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";
require('dayjs/locale/nl')

export function UrenRegistratieForm({ }) {
    return (
        <div className="evaluatie_BarContainer">
            <Bar title="Datum"
                input={dayjs()}
                name={"date"}
                required={true}
                type="date"
            />
            <Bar title="Starttijd"
                name={"startTime"}
                required={true}
                type="time"
            />
            <Bar title="Eindtijd"
                name={"endTime"}
                required={true}
                type="time"
            />
            <Bar title="Gewerkt aan project"
                name={"project"}
                required={true}
                type="dropdown"
                options={options.hourRegistrationProject}
            />
            <Bar title="Gewerkt aan product"
                name={"product"}
                required={true}
                type="dropdown"
                options={options.hourRegistrationProduct}
            />
            <Bar title="Gewerkt aan activiteit"
                name={"activity"}
                required={true}
                type="dropdown"
                options={options.hourRegistrationActivity}
            />
            <Bar title="Toelichting"
                name={"description"}
                type="string"
            />
            <button type="submit"
                className="urenRegistratieSaveBtn"
            >
                Opslaan
            </button>
        </div>
    );
}
