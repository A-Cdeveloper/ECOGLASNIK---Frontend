import AuthContext from "./auth";
import QueryRoute from "./query";
import AppRouter from "./routes";

const MainRouter = () => {
  return (
    <QueryRoute>
      <AuthContext>
        <AppRouter />
      </AuthContext>
    </QueryRoute>
  );
};

export default MainRouter;
