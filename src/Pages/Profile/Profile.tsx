import { FC } from "react";
import { useAuth } from "../../context/AuthContext";

const Profile: FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-900 text-white p-4 md:p-6 rounded-lg w-full max-w-md mx-auto shadow-lg">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-16 h-16 sm:w-12 sm:h-12 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
            ?
          </div>
        )}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">{user ? user.displayName : "Guest"}</h2>
          <p className="text-sm text-gray-400">{user ? user.email : "No email available"}</p>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="mb-4 text-center sm:text-left">
        <h3 className="text-lg font-medium">Storage Usage</h3>
        <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
          <div className="bg-blue-500 h-2 rounded-full w-[75%] max-w-xs"></div>
        </div>
        <p className="text-xs text-gray-400 mt-1">75GB used of 100GB</p>
      </div>
    </div>
  );
};

export default Profile;
