import { useParams } from "react-router-dom";
import Map from "../features/map/Map";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="container bg-primary max-w-full h-screen flex flex-wrap items-start overflow-hidden">
      <Header />
      <Sidebar />
      <main className="flex-1 h-screen p-3">
        <Map problemId={id} />
      </main>
    </div>
  );
};

export default Layout;
