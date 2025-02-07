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
      : error || "Privremena greška na serveru ⚠";
  throw new Error(errorMessage);
};

export const calculateDistanceFromBounds = (
  position: { lat: number; lng: number },
  bounds: {
    northEast: { lat: number; lng: number };
    southWest: { lat: number; lng: number };
  }
): number => {
  const degreeToKm = 111;

  const latDifference = bounds.northEast.lat - position.lat;
  const lngDifference = bounds.northEast.lng - position.lng;

  const latDistanceKm = Math.abs(latDifference * degreeToKm);

  const averageLat = (bounds.northEast.lat + bounds.southWest.lat) / 2;
  const lngDistanceKm = Math.abs(
    lngDifference * degreeToKm * Math.cos((averageLat * Math.PI) / 180)
  );

  return Math.round(Math.max(latDistanceKm, lngDistanceKm));
};

export const resizeImage = async (file: File, targetWidth = 1920) => {
  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    const fileReader = new FileReader();

    // Read the file and load the image
    fileReader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
    };

    fileReader.readAsDataURL(file);

    img.onload = () => {
      try {
        // Calculate the target height to preserve the aspect ratio
        const targetHeight = (img.height / img.width) * targetWidth;

        // Create a canvas and set the target dimensions
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Use 'imageSmoothingQuality' to control the interpolation quality (set to 'high' for best results)
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high"; // 'low', 'medium', or 'high'

          // Draw the image on the canvas at the new size
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert the canvas to a Blob with the original quality (same as input image)
          canvas.toBlob(
            (resizedBlob) => {
              if (resizedBlob) {
                resolve(resizedBlob);
              } else {
                reject(new Error("Error preparing the image"));
              }
            },
            file.type, // Maintain the original file type (JPEG, PNG, etc.)
            1 // Full quality (0-1), set to 1 for no quality loss
          );
        } else {
          reject(new Error("Failed to get canvas context"));
        }
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = (error) => reject(error);
  });
};
