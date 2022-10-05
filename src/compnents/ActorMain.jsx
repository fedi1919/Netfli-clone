import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ActorNavbar = ({ actor, actorID }) => {
  const [images, setImages] = useState([]);
  const [popular, setPopular] = useState([]);
  const [shows, setShows] = useState([]);

  const [navElements, setNavElements] = useState({
    bio: true,
    photos: false,
    films: false,
    tvShows: false,
  });

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
        );
        setPopular(data?.cast);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPopularMovies();
  }, [actorID]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorID}/tv_credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
        );
        setShows(data?.cast);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSeries();
  }, [actorID]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorID}/images?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
        );

        setImages(data?.profiles);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImages();
  }, [actorID]);

  const popularMovies = popular.filter((movie) => movie?.vote_average > 7.0);

  return (
    <>
      <div className="flex justify-evenly items-center w-screen  my-8 text-white">
        <a
          className="text-xl hover:scale-150 duration-200"
          href="#bio"
          onClick={() =>
            setNavElements({
              bio: true,
              photos: false,
              films: false,
              tvShows: false,
            })
          }
        >
          Biograghpy
        </a>
        <a
          className="text-xl hover:scale-150 duration-200"
          href="#photos"
          onClick={() =>
            setNavElements({
              bio: false,
              photos: true,
              films: false,
              tvShows: false,
            })
          }
        >
          Photos
        </a>
        <a
          className="text-xl hover:scale-150 duration-200"
          href="#films"
          onClick={() =>
            setNavElements({
              bio: false,
              photos: false,
              films: true,
              tvShows: false,
            })
          }
        >
          Films
        </a>
        <a
          className="text-xl hover:scale-150 duration-200"
          href="#shows"
          onClick={() =>
            setNavElements({
              bio: false,
              photos: false,
              films: false,
              tvShows: true,
            })
          }
        >
          Tv Shows
        </a>
      </div>

      {navElements.bio && (
        <div id="bio" className="text-gray-500 text-justify p-8">
          {actor?.biography}
        </div>
      )}
      {navElements.photos && (
        <div id="photos" className="flex items-center justify-center flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500/${image?.file_path}`}
              alt="actorImage"
              className="rounded w-60 h-60 object-fill m-8"
            />
          ))}
        </div>
      )}
      {navElements.films && (
        <div id="films" className="flex justify-center items-center flex-wrap">
          {popularMovies.map((film, index) => (
            <div
              key={index}
              className="p-8 transform hover:scale-125 duration-300 ease-in w-60 h-96"
            >
              <Link to={`/movie/${film?.id}`}>
                <img
                  className="rounded w-full h-[70%] object-fill"
                  src={`https://image.tmdb.org/t/p/w500/${film?.backdrop_path}`}
                  alt={film?.title}
                />
                <h1 className="text-white text-lg text-center">
                  {film?.title}
                </h1>
              </Link>
            </div>
          ))}
        </div>
      )}
      {navElements.tvShows && (
        <div id="shows" className="flex justify-center items-center flex-wrap">
          {shows.map((show, index) => (
            <div
              key={index}
              className="p-8 transform hover:scale-125 duration-300 ease-in w-60 h-96"
            >
              <img
                className="rounded w-full h-[70%] object-fill"
                src={`https://image.tmdb.org/t/p/w500/${show?.backdrop_path}`}
                alt={show?.name}
              />
              <h1 className="text-white text-lg text-center">{show?.name}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ActorNavbar;
