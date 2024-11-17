import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//import Layout from "../ui/Layout";

import Homepage from "../pages/Homepage";
import ImpressumPage from "../pages/ImpressumPage";
import LoginPage from "../pages/LoginPage";
import Notifications from "../ui/Notifications";
import ProtectedRoute from "../ui/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyAccount from "../pages/VerifyAccount";
import Layout from "../ui/Layout";
import SingleProblem from "../pages/SingleProblem";
import UserProblems from "../pages/UserProblems";

const AddProblem = lazy(() => import("../pages/AddProblem"));
const EditProblem = lazy(() => import("../pages/EditProblem"));

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
          {
            path: "verify-account/:userId/:verificationCode",
            element: <VerifyAccount />,
          },
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
