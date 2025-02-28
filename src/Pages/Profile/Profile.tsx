import { FC } from "react";
//import { AiOutlineCloud, AiOutlineSetting } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

const Profile: FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-96">
      <div className="flex items-center space-x-4 mb-4">
        {user?.photoURL ? (
       <img src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" className="w-12 h-12 rounded-full" />


        ) : (
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
            ?
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{user ? user.displayName : "Guest"}</h2>
          <p className="text-sm text-gray-400">{user ? user.email : "No email available"}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium">Storage Usage</h3>
        <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
          <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
        </div>
        <p className="text-xs text-gray-400 mt-1">75GB used of 100GB</p>
      </div>

      {/* <div className="flex justify-between items-center mt-4">
        <button className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-lg text-sm">
          <AiOutlineCloud />
          <span>Upgrade Plan</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg text-sm">
          <AiOutlineSetting />
          <span>Settings</span>
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
