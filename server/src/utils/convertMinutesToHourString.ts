export const convertMinutesToHourString = (minutesAmount: number) => {
  const hours = Math.floor(minutesAmount / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (minutesAmount % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
