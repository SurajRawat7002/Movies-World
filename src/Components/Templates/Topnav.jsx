import axios from "../../Utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Noimage from "../../Images/no-image.jpg";
const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const GetSearch = async () => {
    try {
      const res = await axios.get(`/search/multi?query=${query}`);
      setsearches(res.data.results);
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    GetSearch();
  }, [query]);
  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center pl-[10%] z-50">
      <i className="ri-search-line text-3xl text-zinc-400 "></i>
      <input
        type="text"
        placeholder="Search Anything"
        className="w-[70%] mx-10 p-3 text-xl rounded-lg outline-none  bg-transparent capitalize"
        onChange={(e) => {
          setquery(e.target.value);
        }}
        value={query}
      />
      {query.length > 0 && (
        <i
          className="ri-close-fill text-3xl text-zinc-400  right-0"
          onClick={() => {
            setquery("");
          }}
        ></i>
      )}
      <div className="w-[75%] max-h-[50vh] bg-zinc-200 absolute top-[100%] overflow-auto rounded left-[18%]">
        {searches.map((item, index) => {
          return (
            <Link
            to={`/${item.media_type}/details/${item.id}`}
              key={index}
              className="w-full p-10 flex justify-start items-center border-b-2 border-zinc-100 text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300"
              onClick={()=>{
                console.log(item)
              }}
            >
              <img
                src={
                  item.backdrop_path || item.profile_path || item.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.backdrop_path ||
                        item.profile_path ||
                        item.poster_path
                      }`
                    : Noimage
                }
                alt="No image found"
                className="w-[10vh] h-[10vh] shadow-lg object-cover rounded mr-10 text-[10px] font-bold"
              />
              <span>
                {item.name ||
                  item.title ||
                  item.original_title ||
                  item.original_name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topnav;
