import AuthContext from "./auth";
import MapContext from "./map";
import QueryRoute from "./query";
import AppRouter from "./routes";

const MainRouter = () => {
  return (
    <QueryRoute>
      <AuthContext>
        <MapContext>
          <AppRouter />
        </MapContext>
      </AuthContext>
    </QueryRoute>
  );
};

export default MainRouter;
