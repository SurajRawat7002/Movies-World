import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
const Header = ({ data }) => {
  return (
    <div
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[7%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)) ,url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat:"no-repeat"
      }}
    >
      <h1 className="text-5xl font-bold text-white w-[70%]">
        {data.name ||
          data.title ||
          data.original_title ||
          data.original_name}
      </h1>
      <p className="w-[70%] mt-5">{data.overview.slice(0,200)} ...<Link to={`/${data.media_type}/details/id`} className="text-blue-400">more</Link></p>
      <p className="mt-2">
      <i className="ri-megaphone-fill text-yellow-500"></i>{data.release_date || "No Information"}
      <i className="ri-album-fill text-yellow-500 ml-2"></i>{data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-5 bg-[#6556cd] rounded font-semibold mt-5 ">Watch Trailer</Link>
      {/* <ReactPlayer
        url={`https://www.youtube.com/watch?v=${ytkey.key}`}
        height="70%"
        width="70%"
      /> */}
    </div>
  );
};

export default Header;
