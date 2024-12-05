import React, { useEffect, useState } from "react";
import Topnav from "./Templates/Topnav";
import DropDown from "./Templates/DropDown";
import axios from "../Utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import Cards from "./Templates/Cards";
const TvShows = () => {
  document.title = "MoviesWorld | Tv Shows";
  const [tvShow, settvShow] = useState([]);
  const [page, setpage] = useState(1);
  const [category, setcategory] = useState("airing_today");
  const [hasmore, sethasmore] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();
  const getTvShow = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setpage(page + 1);
        settvShow((prevState) => [...prevState, ...data.results]);
      } else {
        sethasmore(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const refreshHandler = () => {
    if (tvShow.length === 0) {
      getTvShow();
    } else {
      setpage(1);
      settvShow([]);
      getTvShow();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  console.log(tvShow);
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Effect to handle scrolling and button visibility

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return tvShow.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full h-[10vh] flex justify-between items-center p-[2%] mb-10">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            className="ri-arrow-left-line text-3xl font-semibold text-zinc-400 hover:text-[#6556cd]"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          TvShows
          <span className="text-sm ml-2">{category}</span>
        </h1>
        <Topnav />
        <DropDown
          title="Category"
          option={["airing_today", "on_the_air", "popular", "top_rated"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={tvShow.length}
        next={getTvShow}
        hasMore={hasmore}
        loader={<Loader />}
      >
        <Cards data={tvShow} val={false} title="tv"/>
      </InfiniteScroll>
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 px-4 py-2 text-xl rounded bg-[#6556cd] text-white shadow-md hover:bg-[#4b3da9] transition"
      >
        ⬆
      </button>
    </div>
  ) : (
    <Loader />
  );
};

export default TvShows;
