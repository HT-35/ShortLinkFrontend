import React from "react";
import Authen from "../login/Authen";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text select-none">
        Boostech
      </div>

      <div className="auth flex justify-between text-white items-center font-medium gap-10">
        <Authen></Authen>
      </div>
    </div>
  );
};

export default Header;
