import QueryRoute from "./query";
import AppRouter from "./routes";

const MainRouter = () => {
  return (
    <QueryRoute>
      <AppRouter />
    </QueryRoute>
  );
};

export default MainRouter;
