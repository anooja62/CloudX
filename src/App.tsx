import { useState } from "react";
import "./App.css";
import MainPage from "./components/main-page/MainPage";
import Sidebar from "./components/Sidebar";
import Login from "./components/login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <div className="bg-slate-900 h-screen w-screen flex">
          <Sidebar />
          <div className="flex-1 p-4 text-white">
            <MainPage />
          </div>
        </div>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;
