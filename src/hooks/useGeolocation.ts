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
        setError(error.message);
        setIsLoading(false);
      }
    );
  }, []);

  return { isLoading, position, error, setPosition };
}
