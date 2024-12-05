import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../Images/no-image.jpg";
const HorizontalCards = ({ trend, title ,height=false}) => {
  return (
    <>
      {trend && (
        <div className={`w-full h-[40vh] px-10 py-6`}>
          <div className={`w-[100%] h-[45vh] flex overflow-y-hidden`}>
            {trend !=null ? (
              trend.cast?trend.cast.map((item, idx) => (
                <Link
                  to={`/${item.media_type ? item.media_type : title}/details/${
                    item.id
                  }`}
                  key={idx}
                  className="min-w-[20%] bg-zinc-900 mr-4 mb-4"
                >
                  <img
                    className="w-full h-[55%] object-cover"
                    src={
                      item.backdrop_path || item.poster_path
                        ? `https://image.tmdb.org/t/p/original/${
                            item.backdrop_path || item.poster_path
                          }`
                        : noImage
                    }
                    alt=""
                  />
                  <div className={`p-2 h-[45%] w-full`}>
                    <h1 className="text-xl font-semibold">
                      {item.title ||
                        item.name ||
                        item.original_name ||
                        item.original_title}
                    </h1>

                    {item.overview && (
                      <p className="mt-5">
                        {item.overview.slice(0, 100)} ...
                        <span className="text-blue-500 cursor-pointer">
                          more
                        </span>
                      </p>
                    )}
                  </div>
                </Link>
              )):trend.map((item, idx) => (
                <Link
                  to={`/${item.media_type ? item.media_type : title}/details/${
                    item.id
                  }`}
                  key={idx}
                  className="min-w-[20%] bg-zinc-900 mr-4 mb-4"
                >
                  <img
                    className="w-full h-[55%] object-cover"
                    src={
                      item.backdrop_path || item.poster_path
                        ? `https://image.tmdb.org/t/p/original/${
                            item.backdrop_path || item.poster_path
                          }`
                        : noImage
                    }
                    alt=""
                  />
                  <div className={`p-2 h-[45%] w-full`}>
                    <h1 className="text-xl font-semibold">
                      {item.title ||
                        item.name ||
                        item.original_name ||
                        item.original_title}
                    </h1>

                    {item.overview && (
                      <p className="mt-5">
                        {item.overview.slice(0, 100)} ...
                        <span className="text-blue-500 cursor-pointer">
                          more
                        </span>
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <h1 className="text-4xl font-semibold">
                NO Recommendations is Available
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HorizontalCards;
