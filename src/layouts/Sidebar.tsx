import { useState, useRef } from "react";
import { FaHome, FaClock, FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUploadFile } from "../hooks/useFiles"; // Import the upload function

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState<string>("Home");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const uploadFileMutation = useUploadFile(); // Use the upload mutation

  const menuItems: MenuItem[] = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Recent", icon: <FaClock />, path: "/recent" },
  ];

  const handleNewClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFileMutation.mutate(file, {
        onSuccess: () => {
          console.log("File uploaded successfully!");
        },
        onError: (error) => {
          console.error("Upload failed:", error);
        },
      });
    }
  };

  const handleNavigation = (name: string, path: string) => {
    setSelected(name);
    navigate(path);
  };

  return (
    <div className="w-64 bg-slate-700 p-4 max-h-screen flex flex-col min-h-screen">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Upload Button */}
      <button
        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-4 hover:bg-gray-200"
        onClick={handleNewClick}
      >
        <IoMdAdd className="text-xl" />
        <span>New</span>
      </button>

      {/* Sidebar Menu */}
      <ul className="flex flex-col space-y-1">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer 
            ${selected === item.name ? "bg-blue-100 text-slate-700" : "hover:bg-gray-200"}`}
            onClick={() => handleNavigation(item.name, item.path)}
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