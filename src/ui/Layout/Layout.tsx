import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Weather from "../../features/weather/Weather";

const MapComponent = lazy(() => import("../../features/map/Map"));

const Layout = () => {
  const params = useParams();

  return (
    <div className="container bg-primary max-w-full h-screen lg:h-screen flex flex-wrap items-start overflow-hidden">
      <Header />
      <Sidebar />

      <main className="flex-1 h-[450px] lg:h-screen pt-[65px] lg:pt-[80px] px-3 lg:px-3 pb-1 lg:pb-5 flex flex-col justify-center order-1 lg:order-2 overflow-hidden relative">
        <Suspense fallback={<div>Loading map...</div>}>
          <MapComponent
            problemId={params.id ? params.id : ""}
            userId={params.id ? params.id : ""}
          />
        </Suspense>
        <Weather />
      </main>
    </div>
  );
};

export default Layout;
