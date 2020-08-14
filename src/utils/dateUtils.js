//@flow

import type { date } from "./Types";
export const parseDate = (date: string): date => {
  const dateArr = date.split("-").map(Number);

  return {
    year: dateArr[0] || 0,
    month: dateArr[1] || 0,
    day: dateArr[2] || 0,
  };
};
export const dateGreaterThan = (a: date, b: date): boolean =>
  a.year > b.year ||
  (a.year === b.year && a.month > b.month) ||
  (a.year === b.year && a.month === b.month && a.day > b.day);

export const dateEqual = (a: date, b: date): boolean =>
  a.year === b.year && a.month === b.month && a.day === b.day;
