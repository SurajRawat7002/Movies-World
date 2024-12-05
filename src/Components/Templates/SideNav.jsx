import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-3">
      <h1 className="text-2xl font-bold">
        <i className="ri-tv-fill text-[#6556cd] mr-2"></i>
        <span>MoviesWorld</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="font-semibold text-xl mt-10 mb-5">New Feeds</h1>
        <Link to="/trending" className="hover:bg-[#6561cd] hover:text-white p-5 rounded-lg duration-300">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to='/popular' className="hover:bg-[#6561cd] hover:text-white p-5 rounded-lg duration-300">
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6561cd] hover:text-white p-5 rounded-lg duration-300">
          <i className=" mr-2 ri-movie-fill"></i>
          Movies
        </Link>
        <Link to='/tv' className="hover:bg-[#6561cd] hover:text-white p-5 rounded-lg duration-300">
          <i className="mr-2 ri-tv-2-fill"></i>
          Tv Shows
        </Link>
        <Link to='/person' className="hover:bg-[#6561cd] hover:text-white p-5 rounded-lg duration-300">
          <i className="ri-team-fill mr-2"></i>
          People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      {/* ######################### web Information */}
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="font-semibold text-xl mt-10 mb-5 capitalize">
          Web Information
        </h1>
        <Link to="/page" className="hover:bg-[#6561cd] hover:text-white p-5 rounded-lg duration-300">
          <i className="ri-information-fill mr-2"></i> About Us
        </Link>
        <Link className="hover:bg-[#6561cd] hover:text-white p-5 rounded-lg duration-300">
          <i className="ri-phone-fill mr-2"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
