import "./addIncident.scss"
import { Bar } from "../bar/bar"
import options from "../../../dropdownOptions"

export function AddIncident() {
    return (
    <div className="incident_BarContainer">
        <Bar title="Datum" input={new Date()} type="date" />
        <Bar title="Omschrijving" input="" type="string" />
        <Bar title="Locatie" input="" type="string" />
        <Bar title="Betrokkenen" input="" type="dropdown_multiple" options={options.employees}/>
        <button type="button" className="addIncidentBtn">ADD</button>
    </div>
    )
}