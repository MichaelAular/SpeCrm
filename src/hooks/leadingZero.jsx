export function useLeadingZero(input, digitAmount) {

    const length = input.toString().length;
    const differece =  digitAmount - length;

    return (
        differece > 0 ? "0" + input : input
    )
}