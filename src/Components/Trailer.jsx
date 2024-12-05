import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytkey = useSelector((state) => state[category].info.videos);
  return (
    <>
      <div className="absolute w-screen h-screen flex items-center justify-center top-0 left-0 z-[100] bg-[rgba(0,0,0,.9)]">
        <i
          className="ri-arrow-left-line text-4xl font-semibold text-zinc-400 hover:text-[#6556cd] absolute top-[5%] left-[5%]"
          onClick={() => {
            navigate(-1);
          }}
        ></i>
        {ytkey ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${ytkey.key}`}
            height="70%"
            width="70%"
          />
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
};

export default Trailer;
