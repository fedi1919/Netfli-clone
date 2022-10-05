import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";

import requests from "../Requests";

const Main = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(requests.nowPlayingMovies);

        setMovies(data.results);
        setIsFetching(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchMovies();
  }, []);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="w-full h-[550px] text-white">
          <div className="w-full h-full">
            <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
            <div className="absolute w-full top-[20%] p-4 md:p-8">
              <h1 className="tet-3xl md:text-5xl font-bold">{movie?.title}</h1>

              <div className="my-4">
                <button className="border rounded bg-gray-300 text-black py-2 p-5 hover:bg-gray-400">
                  Play
                </button>
                <Link to={`/movie/${movie?.id}`}>
                  <button className="border rounded text-white py-2 px-4 ml-4 hover:bg-gray-300 hover:text-black">
                    More Details
                  </button>
                </Link>
              </div>

              <p className="text-gray-400 text-sm">
                Released: {movie?.release_date}
              </p>
              <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[30%] text-gray-200 pt-10">
                {truncateString(movie?.overview, 150)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
