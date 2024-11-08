import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "../ui/Layout";
//import ProtectedRoute from "../ui/ProtectedRoute";
import AddProblem from "../pages/AddProblem";
import Homepage from "../pages/Homepage";
import ImpressumPage from "../pages/ImpressumPage";
import SingleProblem from "../pages/SingleProblem";
import Notifications from "../ui/Notifications";

//import PageNotFound from "../pages/PageNotFound";

const mainRouter = [
  // { path: "/login", element: <LoginPage /> },
  {
    element: (
      // <ProtectedRoute>
      <Layout />
      // </ProtectedRoute>
    ),
    children: [
      { path: "/", index: true, element: <Homepage /> },
      {
        path: "problems",
        children: [
          { path: ":id", element: <SingleProblem /> },
          { path: "add", element: <AddProblem /> },
        ],
      },
      { path: "/impressum", element: <ImpressumPage /> },
    ],
    // errorElement: <PageNotFound />,
  },
];

const router = createBrowserRouter(mainRouter);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Notifications />
    </>
  );
};

export default AppRouter;
