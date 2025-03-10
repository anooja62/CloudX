import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const MainLayout: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (!user) return <Navigate to="/login" />; // Redirect to login if not authenticated

  return (
    <div className="flex bg-slate-800 min-h-screen">
      {/* Sidebar (Hidden on small screens, toggleable) */}
      <div
        ref={sidebarRef}
        className={`absolute md:relative inset-y-0 left-0 z-50 transition-transform transform 
     ${
       sidebarOpen ? "translate-x-0" : "-translate-x-full"
     } md:translate-x-0 md:w-64 bg-slate-900`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

   
    </div>
  );
};

export default MainLayout;
