import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import DropDown from "./Templates/DropDown";
import axios from "../Utils/axios";
import Cards from "./Templates/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const Trending = () => {
  document.title = "MoviesWorld | Trending";
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setpage(page + 1);
        settrending((prevState) => [...prevState, ...data.results]);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
      getTrending();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category, duration]);
console.log(trending)
  // ######################here the code for to direct scroll from bottom to top using one click
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

  // ###########here the code for main content of the page
  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full h-[10vh] flex justify-between items-center px-[4%]">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            className="ri-arrow-left-line text-3xl font-semibold text-zinc-400 hover:text-[#6556cd]"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          Trending
        </h1>
        <Topnav />
        <DropDown
          title="Category"
          option={["all", "tv", "movie"]}
          func={(e) => setcategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <DropDown
          title="Duration"
          option={["week", "day"]}
          func={(e) => setduration(e.target.value)}
        />
      </div>
      {/* Trending Movie Section */}

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>loading chl rhi hai</h1>}
      >
        <Cards data={trending} title={category} />
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

export default Trending;
