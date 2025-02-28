import React from "react";
import Recent from "../Recents/Recent";

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-white">Welcome</h1>
      <Recent />
    </div>
  );
};

export default Home;
