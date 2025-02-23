
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {  Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
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
