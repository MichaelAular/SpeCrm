import "./urenRegistratie.scss";
import React, { useState } from "react";
import options from "../../../dropdownOptions.json";
import { Bar } from "../bar/bar";
import dayjs from "dayjs";
require('dayjs/locale/nl')

export function UrenRegistratieForm({ }) {
    const [product, setProduct] = useState('');
    const handleChange = (newValue) => {
        console.log(newValue);
        setProduct(newValue);
    };

    function getSubcategoriesByValue(list, value) {
        const item = list.find(
          (product) => product.value === value
        );
        return item ? item.subcategories : [];
      }

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
                onChange={(event) => handleChange(event)}
            />
            <Bar title="Gewerkt aan activiteit"
                name={"activity"}
                required={true}
                type="dropdown"
                options={getSubcategoriesByValue(options.hourRegistrationProduct, product)}
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
