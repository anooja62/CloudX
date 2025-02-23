import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Recent from "../Pages/Recents/Recent";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Wraps pages inside layout
    children: [
      { path: "/recent", element: <Recent /> },

    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
