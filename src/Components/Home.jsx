import React, { useEffect, useState } from "react";
import SideNav from "./Templates/SideNav";
import Topnav from "./Templates/Topnav";
import axios from "../Utils/axios";
import Header from "./Templates/Header";
import HorizontalCards from "./Templates/HorizontalCards";
import DropDown from "./Templates/DropDown";
import Loader from "./Loader";

const Home = () => {
  document.title = "MoviesWorld | HomePage";

  // ##function for getting movies on the base of category
  const [category, setcategory] = useState("all");
  // const handleTrend=(e)=>{
  //   setcategory(e.target.value)
  // }

  // Rest of our api data for background wallpaper in header

  const [wallpaper, setwallpaper] = useState(null);
  const getHeaderImage = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomData);
    } catch (err) {
      console.log("error", err);
    }
  };

  // Rest of our api data for horizontal cards
  const [trending, settrending] = useState(null);
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (err) {
      console.log("error", err);
    }
  };
  //Here is our useeffect to call our funciton
  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderImage();
  }, [category]);
  // Rest of your Home component code...
  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between items-center px-10 py-6">
          <h1 className="text-3xl text-zinc-400 font-bold ">Trending</h1>
          <DropDown
            title="Filter"
            option={["tv", "movie", "all"]}
            func={(e)=>setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards trend={trending} />
      </div>
    </>
  ) : (
    <Loader/>
  );
};

export default Home;
