import "./age.scss";

export function Age({input}) {
    const today = new Date().getTime();
    const other_date = new Date(input).getTime();
    const difference = Math.abs(today - other_date);
    const days = Math.abs(difference / (1000 * 3600 * 24));
    const years = Math.floor(days / 365.25);

    return (
        <div className="ageContainer">{years}</div>
    )
}