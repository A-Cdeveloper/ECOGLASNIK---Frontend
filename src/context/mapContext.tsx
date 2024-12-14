import type { Map } from "leaflet";
import { createContext, useContext, useState } from "react";
import { DEFAULT_POSITION, INITIAL_ZOOM } from "../constants";

type MapState = {
  mapPosition: { lat: number; lng: number };
  zoomLevel: number;
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
  const [mapPosition, setMapPosition] = useState(DEFAULT_POSITION);
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM); // default zoom level
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
