import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import ForgotPassword from "../pages/ForgotPassword";
import Homepage from "../pages/Homepage";
import ImpressumPage from "../pages/ImpressumPage";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import ResetPassword from "../pages/ResetPassword";
import SingleProblem from "../pages/SingleProblem";
import UserProblems from "../pages/UserProblems";
import { UserProfile } from "../pages/UserProfile";
import VerifyAccount from "../pages/VerifyAccount";
import Layout from "../ui/Layout/Layout";
import ProtectedRoute from "../ui/Layout/ProtectedRoute";
import Notifications from "../ui/PromtsAndNotifications/Notifications";

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
      { path: "/contact", element: <ContactPage /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        children: [
          { index: true, element: <LoginPage /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password", element: <ResetPassword /> },
          {
            path: "verify-account",
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
