import { MapContextProvider } from "../context/mapContext";

const MapContext = ({ children }: { children: React.ReactNode }) => {
  return <MapContextProvider>{children}</MapContextProvider>;
};

export default MapContext;
