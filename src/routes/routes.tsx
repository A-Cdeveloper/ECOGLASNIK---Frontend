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
import UserProblems from "../pages/UserProblems";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyAccount from "../pages/VerifyAccount";

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
            element: <SingleProblem />,
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
          {
            path: "user/:id",
            element: (
              <ProtectedRoute>
                <UserProblems />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "/impressum", element: <ImpressumPage /> },
      {
        path: "/login",
        children: [
          { index: true, element: <LoginPage /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "verify-account", element: <VerifyAccount /> },
        ],
      },
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
