import { useState, useEffect, useCallback } from "react";

type Position = {
  lat: number;
  lng: number;
};

export function useGeolocation() {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = useCallback(() => {
    console.log("Requesting location..."); // Debugging log
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear any previous errors

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              "Omogućite lokaciju u podešavanjima i ponovo učitajte stranicu da biste bili u mogućnosti da odaberete Vašu trenutnu lokaciju."
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Lokacija nije dostupna. Molimo pokusajte ponovo.");
            break;
          case err.TIMEOUT:
            setError("Zahtev za lokaciju je istekao. Molimo pokusajte ponovo.");
            break;
          default:
            setError("Neka greška je pojavila. Molimo pokusajte ponovo.");
        }
        setIsLoading(false);
      }
    );
  }, []);

  // Automatically request location on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { position, error, isLoading, requestLocation };
}
