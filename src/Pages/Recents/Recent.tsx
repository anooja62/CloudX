import { FC, useState, useRef, useEffect } from "react";
import {
  FaFilePdf, FaEllipsisV, FaEye, FaShareAlt, FaEllipsisH,
  FaFileImage, FaFileVideo, FaFileAlt, FaTh, FaBars, FaCheck, FaTimes
} from "react-icons/fa";
import { useFiles } from "../../hooks/useFiles";

const Recent: FC = () => {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedFile, setSelectedFile] = useState<{ url: string; mime_type: string; file_name: string } | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { data: files } = useFiles();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen !== null && dropdownRefs.current[menuOpen] &&
        !dropdownRefs.current[menuOpen]?.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleMenu = (index: number) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handlePreview = (file: { url: string; mime_type: string; file_name: string | null }) => {
    setSelectedFile({
      url: file.url,
      mime_type: file.mime_type,
      file_name: file.file_name ?? "Untitled File", // Provide a fallback name
    });
  };
  

  const handleCloseModal = () => {
    setSelectedFile(null);
  };

  const handleShare = async (fileUrl: string) => {
    try {
      await navigator.clipboard.writeText(fileUrl);
      alert('File link copied to clipboard! ✅');
    } catch (err) {
      alert('Failed to copy link. ❌');
      console.log(err);
    }
  };

  const getIcon = (file: { mime_type: string; url: string }) => {
    if (isGridView) {
      if (file.mime_type.includes("image")) {
        return <img src={file.url} alt="Thumbnail" className="w-16 h-16 object-cover rounded-lg" />;
      }
      if (file.mime_type.includes("video")) {
        return (
          <video className="w-16 h-16 object-cover rounded-lg" muted>
            <source src={file.url} type={file.mime_type} />
          </video>
        );
      }
    }
  
    if (file.mime_type.includes("image")) return <FaFileImage className="text-yellow-400 text-2xl" />;
    if (file.mime_type.includes("pdf")) return <FaFilePdf className="text-red-400 text-2xl" />;
    if (file.mime_type.includes("video")) return <FaFileVideo className="text-green-400 text-2xl" />;
    
    return <FaFileAlt className="text-gray-400 text-2xl" />;
  };

  return (
    <div className="p-6 rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Recent Files</h2>

        <div className="flex bg-gray-700 rounded-full p-1 w-28">
          <button
            className={`flex-1 flex items-center justify-center p-2 rounded-full ${
              !isGridView ? "bg-white text-black" : "text-gray-400"
            }`}
            onClick={() => setIsGridView(false)}
          >
            <FaBars />
            {!isGridView && <FaCheck className="ml-1 text-sm" />}
          </button>

          <button
            className={`flex-1 flex items-center justify-center p-2 rounded-full ${
              isGridView ? "bg-white text-black" : "text-gray-400"
            }`}
            onClick={() => setIsGridView(true)}
          >
            <FaTh />
            {isGridView && <FaCheck className="ml-1 text-sm" />}
          </button>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className={isGridView ? "grid grid-cols-3 gap-4" : "space-y-3"}>
          {files?.map((file, index) => {
            const formattedDate = new Date(file.created_at).toLocaleDateString("en-GB");

            return (
              <div
                key={index}
                className={`p-4 rounded-lg text-white relative flex ${
                  isGridView ? "flex-col items-center text-center bg-gray-800 w-full min-h-[120px]" 
                            : "flex-row bg-gray-900"
                }`}
                onClick={() => handlePreview(file)}
              >
                <div className="text-2xl p-3 rounded-lg">{getIcon(file)}</div>
                <div className="flex-1 w-full">
                  <p className="mx-auto text-sm font-medium">{file.file_name}</p>
                  <p className="text-xs text-gray-400">{formattedDate} • {file.size_formatted}</p>
                </div>

                <div className="relative">
                  <button onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(index);
                    }} 
                    className="p-2 rounded-full hover:bg-gray-700">
                    {isGridView ? <FaEllipsisH /> : <FaEllipsisV />}
                  </button>
                  {menuOpen === index && (
                    <div
                      ref={(el) => {
                        dropdownRefs.current[index] = el;
                      }}
                      className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg text-black text-sm z-10"
                    >
                      <button
                        onClick={() => handlePreview(file)}
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-200"
                      >
                        <FaEye className="mr-2 text-gray-600" /> Preview
                      </button>
                      <button
                        onClick={() => handleShare(file.url)}
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-200"
                      >
                        <FaShareAlt className="mr-2 text-gray-600" /> Share
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedFile && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center w-screen h-screen z-50">
    <div className="bg-gray-900 p-6 rounded-lg text-white w-[80vw] max-w-4xl h-[80vh] relative flex flex-col">
      
      {/* Close Button */}
      <button 
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        onClick={handleCloseModal}
      >
        <FaTimes />
      </button>

      {/* File Name */}
      <h2 className="text-2xl font-semibold mb-4 text-center">{selectedFile.file_name}</h2>

      {/* File Preview */}
      <div className="flex-1 flex justify-center items-center">
        {selectedFile.mime_type.includes("image") ? (
          <img src={selectedFile.url} alt="Preview" className="w-full max-h-[60vh] object-contain rounded-lg" />
        ) : selectedFile.mime_type.includes("pdf") ? (
          <iframe 
            src={selectedFile.url} 
            className="w-full h-full border-none rounded-lg"
          ></iframe>
        ) : (
          <p className="text-lg">Preview not available for this file type.</p>
        )}
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Recent;
