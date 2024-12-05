import React, { useEffect, useState } from "react";
import DropDown from "./Templates/DropDown";
import { useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import axios from "../Utils/axios";
import Loader from "./Loader";
import Cards from '../Components/Templates/Cards'
import InfiniteScroll from "react-infinite-scroll-component";

const Poupular = () => {
  document.title="MoviesWorld | PopularPage"

  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpage(page + 1);
        setpopular((prevState) => [...prevState, ...data.results]);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);

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

  return popular.length>0 ? (
    <div className="w-screen h-screen bg-[#1f1e24] ">
      <div className="w- full h-[10vh] p-[1%] flex justify-between items-center">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            className="ri-arrow-left-line text-3xl font-semibold text-zinc-400 hover:text-[#6556cd]"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          Popular
        </h1>
        <Topnav />
        <DropDown
          title="Category"
          option={["movie", "tv"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      {/* Add your code here for the popular movies */}
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={popular} title={category==="movie"?"movie":"tv"} />
      </InfiniteScroll>
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 px-4 py-2 text-xl rounded bg-[#6556cd] text-white shadow-md hover:bg-[#4b3da9] transition"
      >
        ⬆
      </button>
    </div>
  ) :
    <Loader />
  ;
};

export default Poupular;
