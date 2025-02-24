import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-slate-800 p-4 flex items-center justify-between shadow-md">
      {/* Logo / Title */}
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
      <FaUserCircle className="text-white text-3xl cursor-pointer" />
    </div>
  );
};

export default Navbar;
