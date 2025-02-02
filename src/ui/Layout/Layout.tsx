import { Suspense, lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCtxMap } from "../../context/mapContext";

import { useSettings } from "../../features/settings/hooks/useSettings";
import Error from "../Error";
import Loader from "../Loader";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MapComponent = lazy(() => import("../../features/map/Map"));

const Layout = () => {
  const params = useParams();
  const { settings, isLoading, error } = useSettings();
  const { setMapPosition, setZoomLevel, setDefaultBounds } = useCtxMap();

  useEffect(() => {
    if (!settings) return;
    // Update the context
    setMapPosition(settings.data.defaultPosition);
    setZoomLevel(settings.data.initialZoom);
    setDefaultBounds(settings.data.defaultBound);
  }, [
    isLoading,
    error,
    settings,
    setMapPosition,
    setZoomLevel,
    setDefaultBounds,
  ]);

  let mainContent;

  if (error) {
    mainContent = <Error message={error.message} className="!h-full" />;
  }
  if (isLoading) {
    mainContent = <Loader />;
  }

  if (!isLoading && !error) {
    mainContent = (
      <>
        <Header />
        <Sidebar />

        <main className="flex-1 h-[400px] lg:h-screen pt-[75px] md:pt-[90px] px-3 lg:px-3 pb-1 lg:pb-5 flex flex-col justify-center order-1 lg:order-2 overflow-hidden relative">
          <Suspense fallback={<div>Loading map...</div>}>
            <MapComponent
              problemId={params.id ? params.id : ""}
              userId={params.id ? params.id : ""}
            />
          </Suspense>
        </main>
      </>
    );
  }
  return (
    <>
      <div className="container bg-primary max-w-full h-full lg:h-[88vh] flex flex-wrap items-start overflow-hidden">
        {mainContent}
      </div>
      {!isLoading && !error && <Footer />}
    </>
  );
};

export default Layout;
