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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    const files = event.target.files;
    if (!files || files.length === 0) return;
  
    const fileArray = Array.from(files);
    setUploading(true);
    setProgress(0);
  
    uploadFileMutation.mutate(fileArray, {
      onSuccess: () => {
        setProgress(100);
        setTimeout(() => setUploading(false), 3000);
      },
      onError: (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      // ❌ Remove onUploadProgress from here! React Query doesn't support it.
    });
  
    event.target.value = "";
  };
  

  const handleNavigation = (name: string, path: string) => {
    setSelected(name);
    navigate(path);
  };

  return (
    <div className="w-64 bg-slate-700 p-4 max-h-screen flex flex-col min-h-screen relative">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileUpload}
      />

      {/* Upload Button */}
      <button
        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md mb-4 hover:bg-gray-200"
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

      {/* Upload Progress Bar */}
      {uploading && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-lg shadow-lg w-64">
          <p className="text-sm mb-1">Uploading...</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
