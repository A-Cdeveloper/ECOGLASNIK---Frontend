import { TranslationProvider } from "../context/translationContext";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import AuthContext from "./auth";
import MapContext from "./map";
import QueryRoute from "./query";
import AppRouter from "./routes";

const MainRouter = () => {
  // check internt connection
  useOnlineStatus();

  return (
    <QueryRoute>
      <AuthContext>
        <MapContext>
          <TranslationProvider>
            <AppRouter />
          </TranslationProvider>
        </MapContext>
      </AuthContext>
    </QueryRoute>
  );
};

export default MainRouter;
