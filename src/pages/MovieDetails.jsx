import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

import Loader from "../compnents/Loader";
import Row from "../compnents/Row";
import TrailerModal from "../compnents/TrailerModal";
import Icon from "../compnents/Icon";

const MovieDeatils = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState([]);
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const location = useLocation();
  const movieId = location.pathname.split("/")[2];

  const urlSimilarMovies = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        );

        setMovie(data);
        setIsFetching(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMovie();
  }, [movieId]);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie?.id,
          title: movie?.title,
          img: movie?.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        );
        setCast(data.cast);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCast();
  }, [movieId]);

  const onClose = () => setWatchTrailer(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isFetching ? (
        <Loader />
      ) : (
        <div className="flex-col">
          <div className="w-full h-[600px] text-white">
            <div className="absolute w-full h-[600px] bg-black/60"></div>
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
            <div className="absolute w-full top-[15%] p-4 md:p-8 flex  justify-between">
              <div className="w-full">
                <h1 className="text-3xl md:text-5xl font-bold">
                  {movie?.title}
                </h1>
                <h2 className="text-sm md:text-lg my-2 ">{movie?.tagline}</h2>
                <p className="text-gray-400 text-sm">
                  Released: {movie?.release_date}
                </p>
                <p className=" text-gray-200 my-2">{movie?.overview}</p>
                <button
                  className="border rounded text-white py-2 px-4 mt-2 hover:bg-gray-300 hover:text-black"
                  onClick={() => setWatchTrailer(true)}
                >
                  Watch Trailer
                </button>
                <button className="border rounded text-white py-2 px-4 mt-2 ml-4 hover:bg-gray-300 hover:text-black">
                  {like ? (
                    <Link to={"/account"}>
                      <p>Show Favorites</p>
                    </Link>
                  ) : (
                    <p onClick={saveShow}>Add To Favorites</p>
                  )}
                </button>
              </div>
              <div className="w-full mx-20 text-sm md:text-lg ">
                <h2 className="my-2">
                  Genres:{" "}
                  {movie?.genres?.map((item, index) => (
                    <button
                      key={index}
                      className="rounded-full border px-8 py-2 m-2 cursor-default"
                    >
                      {item.name}
                    </button>
                  ))}
                </h2>
                <p className="my-2">
                  Runtime: <span className="mx-2">{movie?.runtime}min</span>
                </p>
                <p className="my-2">
                  Rate:
                  <span className="mx-2">
                    {movie?.vote_average?.toString().slice(0, 3)}
                  </span>
                </p>
                <div className="flex space-x-3">
                  <h2>Cast:</h2>

                  {cast?.slice(0, 8).map((item, index) => (
                    <div className="m-8" key={index}>
                      <Link to={`/actor/${item.id}`}>
                        <Icon item={item} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Row title="Similar Movies" fetchUrl={urlSimilarMovies} />
          <TrailerModal
            watchTrailer={watchTrailer}
            onClose={onClose}
            movieId={movieId}
          />
        </div>
      )}
    </motion.div>
  );
};

export default MovieDeatils;
