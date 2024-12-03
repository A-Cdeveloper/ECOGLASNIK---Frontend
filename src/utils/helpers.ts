/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, differenceInSeconds } from "date-fns";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formattedDate = (date: Date) => format(date, "dd.MM.yyyy HH:mm");

export const differenceInSecs = (date1: Date, date2: Date) => {
  return differenceInSeconds(date1, date2);
};

export const getErrorMessage = (errorMsg: string) => {
  if (!errorMsg) return;
  // Remove "Error: " from the beginning of the error message
  return errorMsg.replace(/^Error:\s*/, "");
};

export const throwError = async (error: any) => {
  const errorMessage =
    error instanceof Error ? error.message : "Privremena greška na serveru ⚠";
  throw new Error(errorMessage);
};
