import React from "react"; // ✅ Explicit import
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Recent from "../Pages/Recents/Recent";
import Login from "../Pages/Login/Login";
import { useAuth } from "../context/AuthContext";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/recent", element: <Recent /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
