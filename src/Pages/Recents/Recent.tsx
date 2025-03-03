import { FC, useState, useRef, useEffect } from "react";
import {
  FaFilePdf,
  FaEllipsisV,
  FaEye,
  //FaDownload,
  FaShareAlt,
  FaFileImage,
  FaFileVideo,
  FaFileAlt,
} from "react-icons/fa";
import { useFiles } from "../../hooks/useFiles";

const Recent: FC = () => {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [hoveredFile, setHoveredFile] = useState<{ url: string; mimeType: string; x: number; y: number } | null>(null);
  const [textPreview, setTextPreview] = useState<string | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { data: files } = useFiles();

  const toggleMenu = (index: number) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen !== null &&
        dropdownRefs.current[menuOpen] &&
        !dropdownRefs.current[menuOpen]?.contains(event.target as Node)
      ) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Fetch text content for .txt files
  const fetchTextContent = async (url: string) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      setTextPreview(text);
    } catch (error) {
      console.error("Error loading text file:", error);
      setTextPreview("⚠️ Failed to load text file.");
    }
  };
  const handlePreview = (fileUrl: string, mimeType: string) => {
    if (mimeType.includes('image') || mimeType.includes('pdf')) {
      window.open(fileUrl, '_blank') // Opens in a new tab
    } else {
      alert('Preview not available for this file type.')
    }
  }

  // const handleDownload = async (url: string | null, fileName: string) => {
  //   if (!url) {
  //     console.error("Invalid URL");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(url, { mode: "cors" }); // Ensure CORS is allowed
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch file: ${response.statusText}`);
  //     }
  
  //     const blob = await response.blob();
  //     const blobUrl = window.URL.createObjectURL(blob);
  
  //     const link = document.createElement("a");
  //     link.href = blobUrl;
  //     link.setAttribute("download", fileName || "download"); // Set filename
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  
  //     // Cleanup
  //     window.URL.revokeObjectURL(blobUrl);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };
  
  
  const handleShare = async (fileUrl: string) => {
    try {
      await navigator.clipboard.writeText(fileUrl)
      alert('File link copied to clipboard! ✅')
    } catch (err) {
      console.error('Failed to copy link:', err)
      alert('Failed to copy link. ❌')
    }
  }
  return (
    <div className="p-6 rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-white">Recent Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {files?.map((file, index) => {
          const formattedDate = new Date(file.created_at).toLocaleDateString("en-GB");

          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg  text-white relative"
              onMouseEnter={(e) => {
                setHoveredFile({ url: file.url, mimeType: file.mime_type, x: e.clientX, y: e.clientY });

                // Fetch text file content if it's a .txt file
                if (file.mime_type.includes("text")) {
                  fetchTextContent(file.url);
                }
              }}
              onMouseLeave={() => {
                setHoveredFile(null);
                setTextPreview(null);
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl p-3 rounded-lg">
                  {file.mime_type.includes("image") ? <FaFileImage className="text-yellow-400 text-2xl" /> :
                   file.mime_type.includes("pdf") ? <FaFilePdf className="text-red-400 text-2xl" /> :
                   file.mime_type.includes("video") ? <FaFileVideo className="text-green-400 text-2xl" /> :
                   file.mime_type.includes("text") ? <FaFileAlt className="text-blue-400 text-2xl" /> :
                   <FaFileAlt className="text-gray-400 text-2xl" />}
                </div>
                <div className="flex-1">
                  <p className="truncate text-sm font-medium">{file.file_name}</p>
                  <p className="text-xs text-gray-400">
                    {formattedDate} • {file.size_formatted}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button onClick={() => toggleMenu(index)} className="p-2 rounded-full hover:bg-gray-700">
                  <FaEllipsisV />
                </button>
                {menuOpen === index && (
                  <div
                    ref={(el) => {
                      dropdownRefs.current[index] = el;
                    }}
                    className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg text-black text-sm z-10"
                  >
                        <button
                      onClick={() => handlePreview(file.url, file.mime_type)}
                      className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      <FaEye className="mr-2 text-gray-600" /> Preview
                    </button>
                    {/* <button
                      className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={() => {
                        if (file.url) {
                          handleDownload(file.url, file.file_name);
                        } else {
                          console.error("File URL is null");
                        }
                      }}
                      

                    >
                      <FaDownload className="mr-2 text-gray-600" /> Download
                    </button> */}
                    <button
                      onClick={() => handleShare(file.url)}
                      className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
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

      {/* Hover Preview Popup */}
      {hoveredFile && (
        <div
          className="absolute bg-white shadow-lg p-4 rounded-lg z-50 transition-opacity duration-300"
          style={{
            top: hoveredFile.y + 10,
            left: hoveredFile.x + 20,
            width: "200px",
            height: "200px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
          
        >
          {hoveredFile.mimeType.includes("image") && (
            <img src={hoveredFile.url} alt="Preview" className="w-full h-full  rounded-lg" />
          )}
          {hoveredFile.mimeType.includes("video") && (
            <video src={hoveredFile.url} controls className="w-full h-full rounded-lg"></video>
          )}
          {hoveredFile.mimeType.includes("pdf") && (
            <iframe src={hoveredFile.url} className="w-full h-full rounded-lg" title="PDF Preview"></iframe>
          )}
          {hoveredFile.mimeType.includes("text") && textPreview && (
            <pre className="w-full h-full p-2 bg-gray-100 text-gray-900 overflow-auto rounded-lg text-xs">
              {textPreview.length > 500 ? textPreview.substring(0, 500) + "..." : textPreview}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default Recent;
