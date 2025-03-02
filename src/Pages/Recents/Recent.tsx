import { FC, useState, useRef, useEffect } from 'react'
import {
  FaFilePdf,
  FaEllipsisV,
  FaEye,
  FaDownload,
  FaShareAlt,
} from 'react-icons/fa'

import { useFiles } from '../../hooks/useFiles'

const Recent: FC = () => {
  const [menuOpen, setMenuOpen] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])

  const { data: files, isLoading, error } = useFiles()
  console.log(files)
  const toggleMenu = (index: number) => {
    setMenuOpen(menuOpen === index ? null : index)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen !== null &&
        dropdownRefs.current[menuOpen] &&
        !dropdownRefs.current[menuOpen]?.contains(event.target as Node)
      ) {
        setMenuOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <div className="p-6 rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {files?.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-800 text-white relative"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl bg-gray-700 p-3 rounded-lg">
                {file.mime_type.includes('image') ? (
                  <img
                    src={file.url}
                    alt={file.file_name || 'Image'}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <FaFilePdf className="text-blue-400 text-2xl" />
                )}
              </div>
              <div className="flex-1">
                <p className="truncate text-sm font-medium">{file.file_name}</p>
                <p className="text-xs text-gray-400">
                  {file.created_at} • {file.size_formatted}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => toggleMenu(index)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <FaEllipsisV />
              </button>
              {menuOpen === index && (
                <div
                  ref={(el) => {
                    dropdownRefs.current[index] = el
                  }}
                  className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg text-black text-sm z-10"
                >
                  <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200">
                    <FaEye className="mr-2 text-gray-600" /> Preview
                  </button>
                  <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200">
                    <FaDownload className="mr-2 text-gray-600" /> Download
                  </button>
                  <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200">
                    <FaShareAlt className="mr-2 text-gray-600" /> Share
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recent
