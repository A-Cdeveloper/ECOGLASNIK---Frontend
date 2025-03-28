import { useState, useEffect, useCallback, use } from "react";
import { TranslationContext } from "../context/translationContext";

type Position = {
  lat: number;
  lng: number;
};

export function useGeolocation() {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = use(TranslationContext);

  const requestLocation = useCallback(() => {
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
            setError(t("enable_location"));
            break;
          case err.POSITION_UNAVAILABLE:
            setError(t("location_not_available"));
            break;
          case err.TIMEOUT:
            setError(t("location_request_timed_out"));
            break;
          default:
            setError(t("location_error"));
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
