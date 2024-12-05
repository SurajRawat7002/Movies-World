import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title, val = true }) => {
  console.log(title);
  return (
    <div className="flex flex-wrap w-full h-full px-[4%]  bg-[#1f1e24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} key={i} className="w-[20vw] mr-[3%] mb-[5%] relative"
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          />
          <h1 className="text-3xl text-zinc-300 mt-3 text-start">
            {c.name || c.title || c.original_title || c.original_name}
          </h1>
          {val && (
            <div className="absolute bg-blue-500 px-3 py-4 rounded-full bottom-[20%] right-2">
              {(c.vote_average * 10).toFixed()}%
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
