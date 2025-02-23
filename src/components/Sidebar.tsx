import { useState, useRef } from "react";
import { FaHome, FaClock, FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Sidebar = () => {
  const [selected, setSelected] = useState("My Drive");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    { name: "Home", icon: <FaHome />, id: "home" },
    { name: "Profile", icon: <FaUser />, id: "profile" },
    { name: "Recent", icon: <FaClock />, id: "recent" },
  ];

 
  const handleNewClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-64 bg-slate-600 p-4 max-h-screen flex flex-col min-h-screen">
  
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => console.log(e.target.files)}
      />

   
      <button
        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md mb-4 hover:bg-gray-200"
        onClick={handleNewClick}
      >
        <IoMdAdd className="text-xl" />
        <span>New</span>
      </button>

    
      <ul className="flex flex-col space-y-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer 
            ${selected === item.name ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}`}
            onClick={() => setSelected(item.name)}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
