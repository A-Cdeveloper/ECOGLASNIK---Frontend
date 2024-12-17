import type { Map } from "leaflet";
import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "../features/settings/hooks/useSettings";
import { Position } from "../types";

type MapState = {
  mapPosition: { lat: number; lng: number };
  zoomLevel: number;
  defaultBounds: { northEast: Position; southWest: Position };
  mapInstance: Map | null;
  setMapInstance: (map: Map) => void;
  setMapPosition: (position: { lat: number; lng: number }) => void;
  setZoomLevel: (zoom: number) => void;
  updateMapView: (position: { lat: number; lng: number }, zoom: number) => void;
};

const MapContext = createContext<MapState | undefined>(undefined);

export const MapContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { settings, isLoading } = useSettings();

  const [mapPosition, setMapPosition] = useState<Position>({
    lat: 0,
    lng: 0,
  });
  const [defaultBounds, setDefaultBounds] = useState({
    northEast: { lat: 0, lng: 0 },
    southWest: { lat: 0, lng: 0 },
  });
  const [zoomLevel, setZoomLevel] = useState<number>(1); // Default zoom level
  const [mapInstance, setMapInstance] = useState<Map | null>(null);

  useEffect(() => {
    if (!isLoading && settings) {
      setMapPosition(settings.defaultPosition);
      setZoomLevel(settings.initialZoom);
      setDefaultBounds(settings.defaultBound);
    }
  }, [isLoading, settings]);

  const updateMapView = (
    position: { lat: number; lng: number },
    zoom: number
  ) => {
    if (mapInstance) {
      mapInstance.setView(position, zoom, { animate: true });
    }
    setMapPosition(position);
    setZoomLevel(zoom);
  };

  if (isLoading) {
    return null; // Optionally, return a loading spinner or placeholder here
  }

  return (
    <MapContext.Provider
      value={{
        mapPosition,
        zoomLevel,
        defaultBounds,
        mapInstance,
        setMapInstance,
        setMapPosition,
        setZoomLevel,
        updateMapView,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCtxMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
