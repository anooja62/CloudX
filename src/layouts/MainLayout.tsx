import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Redirect to login if not authenticated

  return (
    <div className="flex bg-slate-800">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
