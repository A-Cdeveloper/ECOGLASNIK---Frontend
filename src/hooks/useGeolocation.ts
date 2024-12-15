import { useEffect, useState } from "react";

type Position = {
  lat: number;
  lng: number;
};

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    // Check for geolocation support
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        // Handle specific geolocation errors
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          default:
            setError("An unknown error occurred.");
        }
        setIsLoading(false);
      }
    );
  }, []);

  return { isLoading, position, error, setPosition };
}
