import "./addIncident.scss"
import { Bar } from "../bar/bar"
import options from "../../../dropdownOptions"

export function AddIncident() {
    return (
    <div className="incident_BarContainer">
        <Bar title="datum" input={new Date()} type="date" />
        <Bar title="omschrijving" input="" type="string" />
        <Bar title="locatie" input="" type="string" />
        <Bar title="betrokkenen" input="" type="dropdown_multiple" options={options.employees}/>
    </div>
    )
}