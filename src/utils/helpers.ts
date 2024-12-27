/* eslint-disable @typescript-eslint/no-explicit-any */
import { differenceInSeconds, format } from "date-fns";
import L from "leaflet";
import { Position } from "../types";
import axios from "axios";
// Define the bounds

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const outOfMapRange = (
  latlang: Position,
  defaultBounds: { northEast: Position; southWest: Position }
) => {
  const bounds = L.latLngBounds(
    L.latLng(defaultBounds.southWest),
    L.latLng(defaultBounds.northEast)
  );

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
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : "Privremena greška na serveru ⚠";
  throw new Error(errorMessage);
};
