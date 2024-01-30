import "./evaluatieWeek.scss"

export function EvaluatieWeek({weekNr}) {
    return (
        <div className="weekContainer prevent-select ">
            <div className="weekNr">
                Week {weekNr}
            </div>
            <div className="weekDaysContainer">
                <div className="weekDay">MA</div>
                <div className="weekDay">DI</div>
                <div className="weekDay">WO</div>
                <div className="weekDay">DO</div>
                <div className="weekDay">VR</div>
                <div className="weekDay">ZA</div>
            </div>
        </div>
    )
}