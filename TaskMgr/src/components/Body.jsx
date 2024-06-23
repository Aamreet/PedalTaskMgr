import { useState, useEffect } from "react";

const Body = ({ children }) => {
  return (
    <>
      <div key={'body'} className="container body">{children}</div>
    </>
  );
};

export default Body;
