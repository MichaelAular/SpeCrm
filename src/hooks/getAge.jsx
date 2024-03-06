import { useDateFormatter } from "./dateformatter";

export function useGetAge(input, type) {
    const i = type !== "timestamp" ? useDateFormatter(input) : input;
    const other_date = new Date(i).getTime();
    const difference = Math.abs(new Date().getTime() - other_date);
    const days = Math.abs(difference / (1000 * 3600 * 24));
    const years = Math.floor(days / 365.25);
    return years;
}