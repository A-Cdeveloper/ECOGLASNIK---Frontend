import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "../ui/Layout";
//import ProtectedRoute from "../ui/ProtectedRoute";
import AddProblem from "../pages/AddProblem";
import EditProblem from "../pages/EditProblem";
import Homepage from "../pages/Homepage";
import ImpressumPage from "../pages/ImpressumPage";
import LoginPage from "../pages/LoginPage";
import SingleProblem from "../pages/SingleProblem";
import Notifications from "../ui/Notifications";
import ProtectedRoute from "../ui/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";

//import PageNotFound from "../pages/PageNotFound";

const mainRouter = [
  {
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/", index: true, element: <Homepage /> },
      {
        path: "problems",
        children: [
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <SingleProblem />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute>
                <AddProblem />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute>
                <EditProblem />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "/impressum", element: <ImpressumPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
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
