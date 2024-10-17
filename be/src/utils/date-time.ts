import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { TIMEZONE } from "./constants";

export const parseDateTime = (dateTime = "") => {
  const dateTimeType = dateTime === "" ? new Date() : parseISO(dateTime);
  return toZonedTime(dateTimeType, TIMEZONE);
};

export const formatDateToString = (date: number | null | Date): string => format(date, "yyyy/MM/dd HH:mm");

export const formatDateToStringV2 = (date: number | null | Date): string => format(date, "yyyy/MM/dd");

export const formatDateStartString = (date: number | null | Date): string => format(date, "yyyy/MM/dd HH:mm:ss");

export const formatDateToStringV3 = (date: number | null | Date): string => format(date, "yyyy/MM/dd HH:mm");
