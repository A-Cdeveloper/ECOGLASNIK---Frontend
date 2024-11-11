import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "../ui/Layout";
//import ProtectedRoute from "../ui/ProtectedRoute";
import AddProblem from "../pages/AddProblem";
import Homepage from "../pages/Homepage";
import ImpressumPage from "../pages/ImpressumPage";
import SingleProblem from "../pages/SingleProblem";
import Notifications from "../ui/Notifications";
import EditProblem from "../pages/EditProblem";
import useAuth from "../context/useAuth";
import ProtectedRoute from "../ui/ProtectedRoute";
import LoginPage from "../pages/LoginPage";

//import PageNotFound from "../pages/PageNotFound";

const mainRouter = [
  // { path: "/login", element: <LoginPage /> },
  {
    element: <Layout />,
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
    // errorElement: <PageNotFound />,
  },
];

const router = createBrowserRouter(mainRouter);

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <>
      <RouterProvider router={router} />
      <Notifications />
    </>
  );
};

export default AppRouter;
