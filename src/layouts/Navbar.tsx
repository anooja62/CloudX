import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { FaBars } from "react-icons/fa";
interface NavbarProps {
  toggleSidebar: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  console.log("User object in Navbar:", user);
  console.log("Profile Image URL:", user?.photoURL);
  
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
       <button className="md:hidden text-white" onClick={toggleSidebar}>
        <FaBars size={20} />
      </button>
      <h1 className="text-white text-2xl font-semibold">CloudX</h1>
      <div className="relative">
        {user?.photoURL ? (
          <img
            src={user.photoURL || "https://imgs.search.brave.com/J5-KJNoclGIgO9mgbMuULm8xw_ri-hvqZYOyhc50Q64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3LzM0LzY3/LzM2MF9GXzIxNzM0/Njc4Ml83WHBDVHQ4/YkxOSnF2VkFhRFpK/d3Zaam0wZXBRbWo2/ai5qcGc"} 
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
  <div
    ref={dropdownRef}
    className="absolute top-full right-0 sm:w-64 w-56 bg-white shadow-lg rounded-lg p-4 z-50"
  >
    <div className="flex items-center space-x-3 mb-3">
      {user.photoURL ? (
        <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg">
          {user.email}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-sm font-semibold truncate">{user.email}</p>
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
