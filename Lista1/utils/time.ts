export const getTimeDifference = (startTime: number) =>
  (new Date().getTime() - startTime) / 1000;

export const getMinutesDifference = (time1: string, time2: string) => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  const minutesDifference = hours2 * 60 + minutes2 - (hours1 * 60 + minutes1);

  if (minutesDifference < 0) throw new Error('Time difference is negative');
  return minutesDifference;
};
