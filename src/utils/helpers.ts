/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, differenceInSeconds } from "date-fns";
import { DEFAULT_BOUND } from "../constants";
import L from "leaflet";
// Define the bounds
const bounds = L.latLngBounds(
  L.latLng(DEFAULT_BOUND.southWest),
  L.latLng(DEFAULT_BOUND.northEast)
);

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const outOfMapRange = (latlang: { lat: number; lng: number }) => {
  return !bounds.contains(latlang);
};

export const formattedDate = (date: Date, mode = "long") => {
  if (!date) return;
  if (mode === "short") return format(date, "dd.MM.yyyy.");
  return format(date, "dd.MM.yyyy. HH:mm");
};

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
