import "./addAandacht.scss"
import { Bar } from "../bar/bar"


export function AddAandacht() {
    return (
    <div className="aandacht_BarContainer">
        <Bar title="Datum" input={new Date()} type="date" />
        <Bar title="Omschrijving" input="" type="string" />
        <Bar title="Plan van aanpak" input="" type="string" />
        <Bar title="Gemaakte afspraken" input="" type="string" />
        <button type="button" className="addAandachtBtn">ADD</button>
    </div>
    )
}