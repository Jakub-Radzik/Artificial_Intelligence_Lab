export const getTimeDifference = (startTime: number) =>
  (new Date().getTime() - startTime) / 1000;

export const getMinutesDifference = (time1: string, time2: string) => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  const minutesDifference = hours2 * 60 + minutes2 - (hours1 * 60 + minutes1);

  if (minutesDifference < 0) throw new Error('Time difference is negative');
  return minutesDifference;
};

export const calculateTimeCost = (time1: string, time2: string) => {
  // Convert time strings to Date objects
  const date1 = new Date(`2023-03-14T${time1}${time1.length === 5 ? ':00' : ''}`);
  const date2 = new Date(`2023-03-14T${time2}${time2.length === 5 ? ':00' : ''}`);

  // Check if the second time is on the next day
  const isNextDay = date2.getTime() < date1.getTime();

  // If the second time is on the next day, add 24 hours to it
  if (isNextDay) {
    date2.setDate(date2.getDate() + 1);
  }

  // Calculate the time difference in minutes
  const differenceInMilliseconds = date2.getTime() - date1.getTime();
  const differenceInMinutes = differenceInMilliseconds / 1000 / 60;

  return differenceInMinutes;
}
