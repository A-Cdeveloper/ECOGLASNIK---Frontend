/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns/format";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formattedDate = (date: Date) => format(date, "dd.MM.yyyy HH:mm");

export const getErrorMessage = (errorMsg: string) => {
  if (!errorMsg) return;
  // Remove "Error: " from the beginning of the error message
  return errorMsg.replace(/^Error:\s*/, "");
};

export const throwError = async (error: any) => {
  const errorMessage =
    error instanceof Error ? "Privremena greška na serveru" : error.message;
  throw new Error(errorMessage);
};
