import React from "react";

const Header = ({ children }) => {
  return (
    <div className=" container">
      <h1 className=" text-center text-3xl">
        {children}
        <span className="d1">.</span>
        <span className="d2">.</span>
      </h1>
    </div>
  );
};

export default Header;
