import { useState, useRef, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-slate-800 p-4 flex items-center justify-between shadow-md relative">
      {/* Logo */}
      <h1 className="text-white text-2xl font-semibold">CloudX</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-slate-700 px-4 py-2 rounded-lg">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white focus:outline-none"
        />
      </div>

      {/* Profile Icon */}
      <div className="relative">
        <FaUserCircle
          className="text-white text-3xl cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && user && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
            <p className="text-gray-800 text-sm font-semibold">{user.email}</p>
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
