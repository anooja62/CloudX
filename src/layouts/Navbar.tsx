import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddAccount = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  return (
    <div className="w-full bg-slate-800 p-4 flex items-center justify-between shadow-md relative">
      <h1 className="text-white text-2xl font-semibold">CloudX</h1>
      <div className="relative">
        {user?.photoURL ? (
          <img
            src={user.photoURL || "https://via.placeholder.com/150"} 
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
        ) : (
          <div
            className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-2xl text-white cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            ?
          </div>
        )}

        {dropdownOpen && user && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg">?</div>
              )}
              <div>
                <p className="text-gray-800 text-sm font-semibold">{user.email}</p>
                <button className="text-blue-500 text-xs underline" onClick={handleAddAccount}>
                  Change account
                </button>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-3 w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
