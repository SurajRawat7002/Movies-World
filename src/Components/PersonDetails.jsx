import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPerson } from "../Store/Actions/PeopleAction";
import { removeperson } from "../Store/Reducers/personSlice";
import Loader from "./Loader";
import HorizontalCards from "./Templates/HorizontalCards";
import DropDown from "./Templates/DropDown";
import axios from "../Utils/axios";
const PersonDetails = () => {
  const [category, setcategory] = useState("movie_credits");
  const [personMovie, setpersonMovie] = useState([]);
  const { id } = useParams();
  const dispath = useDispatch();
  const { info } = useSelector((state) => state.people);
  const navigate = useNavigate();
  useEffect(() => {
    dispath(asyncLoadPerson(id));
    return () => {
      dispath(removeperson());
    };
  }, [id]);

  // #########################getting movie and tv of person
  const getPersonData = async () => {
    try {
      const { data } = await axios.get(`/person/${id}/${category}`);
      setpersonMovie(data.cast);
    } catch (err) {
      console.log("error", err);
    }
  };
  // #########################calling the personMovie function
  useEffect(() => {
    getPersonData();

    return () => {
      setpersonMovie([]);
    };
  }, [category, id]);
  return info ? (
    <div className="w-screen min-[] px-[5%] flex">
      <div className="part-1 w-[20%] p-[2%]">
        <i
          className="ri-arrow-left-line text-3xl font-semibold text-zinc-400 mt-2 hover:text-[#6556cd]"
          onClick={() => {
            navigate(-1);
          }}
        ></i>
        <div className=" w-full h-[35vh]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt=""
            className="w-full h-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          />
        </div>
        <hr className="mt-6" />
        {/* ##########for external link  */}
        <div className="w-full flex justify-center items-center gap-8 mt-4 text-xl">
          <a
            href={`https://www.themoviedb.org/person/${id}`}
          >
            <i className="ri-earth-line" target="_blank"></i>
          </a>
          <a href={`https://www.facebook.com/${info.externalId.facebook_id}/`} target="_blank">
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a
            href={`https://x.com/${info.externalId.twitter_id}?lang=en`}
            target="_blank"
          >
            <i className="ri-twitter-x-line"></i>
          </a>
          <a
            href={`https://www.instagram.com/${info.externalId.instagram_id}`}
            target="_blank"
          >
            <i className="ri-instagram-line"></i>
          </a>
        </div>
        {/* for person information  */}
        <div className="w-full mt-4">
          <h1 className="text-2xl ">Person Info</h1>
          <div className="w-full">
            <h2 className="text-xl text-zinc-400 mt-2">Known For</h2>
            <h3 className="text-zinc-300">
              {info.detail.known_for_department}
            </h3>
            <h2 className="text-xl text-zinc-400 mt-2">Gender</h2>
            <h3 className="text-zinc-300">
              {info.detail.gender === 1 ? "Female" : "Male"}
            </h3>
            <h2 className="text-xl text-zinc-400 mt-2">BirthDay</h2>
            <h3 className="text-zinc-300">{info.detail.birthday}</h3>
            <h2 className="text-xl text-zinc-400 mt-2">DeathDay</h2>
            <h3 className="text-zinc-300">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}
            </h3>
            <h2 className="text-xl text-zinc-400 mt-2">Place Of Birth</h2>
            <h3 className="text-zinc-300">{info.detail.place_of_birth}</h3>
            <h2 className="text-xl text-zinc-400 mt-2">Also Known As</h2>
            <h3 className="text-zinc-300 flex flex-wrap">
              {info.detail.also_known_as.map((item) => item)}
            </h3>
          </div>
        </div>
      </div>
      {/* ################part 2 */}
      <div className="part-2 w-[80%] p-[4%]">
        <h1 className="text-6xl font-bold text-zinc-500">{info.detail.name}</h1>
        <h3 className=" mt-2 text-2xl text-zinc-400">Birography</h3>
        <p className=" mt-2 text-zinc-430">{info.detail.biography}</p>
        {/* ###############for known for  */}
        <h2 className="text-2xl text-zinc-400 mt-4 font-bold">Known For</h2>
        <div className="w-full">
          <HorizontalCards trend={info.movieCredit} title="movie" />
        </div>
        {/* ############acting with catergory */}
        <div className="w-full mt-[10%]">
          <div className="w-full flex justify-between">
            <h1>Acting</h1>
            <DropDown
              title="Filter"
              option={["tv_credits", "movie_credits"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="w-full border-2 border-zinc-500">
            {personMovie &&
              personMovie.map((item, index) => (
                <Link
                  to={`/${category==="movie_credits"?"movie":"tv"}/details/${
                    item.id
                  }`}
                  className="w-full block text-zinc-400 mt-6 hover:bg-zinc-600 hover:text-zinc-300 ease-in duration-200 px-[5%]"
                  key={index}
                >
                  <h1 className="text-2xl ">{item.original_title?item.original_title:item.name}</h1>
                  <h1 className="text-xl">{item.character}</h1>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
