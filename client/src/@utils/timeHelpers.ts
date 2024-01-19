import moment from "moment";

export const convertDateToTimestamp = (date: Date) => {
  return date ? date.getTime() / 1000.0 : 0.0;
};

export const getStartOfGivenDayTimestamp = (currentTime: Date) => {
  currentTime.setHours(0, 0, 0, 0);
  const startTime = convertDateToTimestamp(currentTime);
  return startTime;
};

export const getEndOfGivenDayTimestamp = (currentTime: Date) => {
  const startTime = getStartOfGivenDayTimestamp(currentTime);
  const endTime = startTime + 24 * 60 * 60 - 1;
  return endTime;
};

// format unix timestamp (s) to formatted hh:mm time
export const formatTsToTime = (ts: number) => {
  return moment.unix(ts).format("hh:mm A");
};

export const formatTsToDate = (ts: number) => {
  return moment.unix(ts).format("DD MMM YYYY");
};

export const formatDateToTime = (currentTime: Date) => {
  return moment(currentTime).format("hh:mm A");
};
