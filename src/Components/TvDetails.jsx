import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadtv } from "../Store/Actions/TvActions";
import { removetv } from "../Store/Reducers/tvSlice";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import HorizontalCards from "./Templates/HorizontalCards";
const TvDetails = () => {
  const { id } = useParams();
  const dispath = useDispatch();
  const { info } = useSelector((state) => state.tv);
  const navigate=useNavigate()
  useEffect(() => {
    dispath(asyncLoadtv(id));
    // getSeason()
    return () => {
      dispath(removetv());
    };
  }, [id]);
  console.log(info);

  return info ? (
    <div
      className="w-screen  px-[5%] relative min-h-[100vh]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)) ,url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="w-full flex gap-10 text-xl p-4">
        <i
          className="ri-arrow-left-line text-3xl font-semibold text-zinc-400 hover:text-[#6556cd]"
          onClick={() => {
            navigate(-1);
          }}
        ></i>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-line" target="_blank"></i>
        </a>
        <a href={info ? `${info.detail.homepage}` : null} target="_blank">
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
          target="_blank"
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex">
        {/* ############part one  */}
        <div className="w-[20%]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          />
        </div>
        {/* ################part 2 */}
        <div className="w-[80%] p-4">
          <h1 className="text-4xl font-extrabold mb-2">
            {info.detail.name}{" "}
            <span className="text-sm">{info.detail.first_air_date}</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 rounded-full px-3 py-4">
              {(info.detail.vote_average * 10).toFixed()}%
            </div>{" "}
            <h4 className="text-2xl">
              User
              <br />
              Score
            </h4>
            <h4 className="font-bold text-zinc-200">
              {info.detail.release_date}
            </h4>
            <div className="flex justify-between items-center gap-3">
              {info.detail.genres.map((val, i) => (
                <h4 key={i}>{val.name}</h4>
              ))}
            </div>
            <h4 className="font-bold text-zinc-200">
              {info.detail.runtime}min
            </h4>
          </div>
          <h3 className="text-xl text-zinc-200 mt-4">{info.detail.tagline}</h3>
          <div className="w-full">
            <h1 className="text-xl text-zinc-100 capitalize mt-8">overview</h1>
            <p className="mt-6 mb-10">{info.detail.overview}</p>
            <Link
              to={`/tv/details/${id}/trailer`}
              className="bg-blue-500 px-4 py-3 rounded-md flex justify-center items-center w-fit capitalize"
            >
              <i className="ri-play-line text-xl"></i>
              play Trailer
            </Link>
          </div>
        </div>
      </div>
      {/* ##################recommendation  */}
      <div className="w-full">
        <HorizontalCards
          trend={info.detail.seasons.map((item) => {
            return item;
          })}
          title={"movie"}
          height={true}
        />
      </div>

      {/* Recommendations */}
      <div className="mt-[10%]">
        <h1 className="text-2xl font-bold text-zinc-400">{info.recommendations ? "Recommendations":"NO Recommendations"}</h1>
        <HorizontalCards
          trend={info.recommendations ? info.recommendations : info.similar}
        />
      </div>
      {/* ##################outlet  */}
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default TvDetails;
