import "./evaluatieInput.scss"
import evaluatie from "../../../evaluatieOpties.json"
import { v4 as uuidv4 } from "uuid";

export function EvaluatieInput() {

    return (
        <div className="evaluatieInputContainer">
            {evaluatie.opties.map((optie)=>{
                return (
                <div className="optie" key={uuidv4()}>
                    {optie}
                </div>
                )
            })}
        </div>
    )
}