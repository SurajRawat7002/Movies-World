import React from "react";
import svgPage from "../Images/404 Error-pana.svg";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-screen h-screen"
      style={{
        background: `url(${svgPage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <i
        className="ri-arrow-left-line text-3xl font-semibold text-zinc-400 hover:text-[#6556cd] absolute top-5 left-5"
        onClick={() => {
          navigate(-1);
        }}
      ></i> */}
    </div>
  );
};

export default NotFound;
