import type { Map } from "leaflet";
import { createContext, useContext, useState } from "react";
import { Position } from "../types";

type MapState = {
  mapPosition: { lat: number; lng: number };
  zoomLevel: number;
  defaultBounds: { northEast: Position; southWest: Position };
  mapInstance: Map | null;
  setMapInstance: (map: Map) => void;
  setMapPosition: (position: { lat: number; lng: number }) => void;
  setZoomLevel: (zoom: number) => void;
  setDefaultBounds: (bounds: {
    northEast: Position;
    southWest: Position;
  }) => void;
  updateMapView: (position: { lat: number; lng: number }, zoom: number) => void;
};

export const MapContext = createContext({} as MapState);

export const MapContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
        setDefaultBounds,
        updateMapView,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
