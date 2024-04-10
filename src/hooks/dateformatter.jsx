export function useDateFormatter(input) {
    const formattedDays = input.split(" ")[0].split("-");
    const convertedDate = new Date(
      formattedDays[2],
      formattedDays[1] - 1,
      formattedDays[0]
      );
      return convertedDate.getTime();
    };
