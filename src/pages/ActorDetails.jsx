import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import Loader from "../compnents/Loader";
import ActorMain from "../compnents/ActorMain";

const ActorDetails = () => {
  const location = useLocation();

  const [isFetching, setIsFetching] = useState(true);
  const [actor, setActor] = useState([]);

  const actorID = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorID}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        );
        setActor(data);
        setIsFetching(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchActor();
  }, [actorID]);

  const getAge = (date) => {
    let age;
    const thisYear = new Date().getFullYear();
    const birthdayYear = new Date(date).getFullYear();

    age = thisYear - birthdayYear;

    return age;
  };
  const getDeathAge = (birthday, deathday) => {
    let age;
    const deathYear = new Date(deathday).getFullYear();
    const birthdayYear = new Date(birthday).getFullYear();

    age = deathYear - birthdayYear;

    return age;
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div className="w-full text-white">
            <img
              className="  object-cover w-full h-[400px]"
              src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
              alt="/"
            />
            <div className="bg-black/75 absolute top-0 left-0 w-full h-[400px]" />
            <div className="absolute top-20 p-4 md:p-8 flex w-screen">
              <img
                className="rounded w-60 h-60 object-fill my-8"
                src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`}
                alt={actor?.name}
              />
              <div className="ml-28">
                <h1 className="text-3xl md:text-5xl font-bold text-center">
                  {actor?.name}
                </h1>
                <div className="my-8 flex justify-between items-center w-[700px]">
                  <div className="text-xl">
                    <div className="flex my-4">
                      <h2>Birthday:</h2>
                      <p className="ml-3">{actor?.birthday}</p>
                    </div>
                    <div className="flex my-4">
                      <h2>Birth Place:</h2>
                      <p className="ml-3">{actor?.place_of_birth}</p>
                    </div>
                    <div className="flex my-4">
                      <h2>Age:</h2>
                      <p className="ml-3">
                        {!actor?.deathday
                          ? getAge(actor?.birthday)
                          : getDeathAge(actor?.birthday, actor?.deathday)}
                      </p>
                    </div>
                  </div>
                  <div className="text-xl ml-10">
                    <div className="flex my-4">
                      <h2>Gender:</h2>
                      <p className="ml-3">
                        {actor?.gender === 2 ? "Male" : "Female"}
                      </p>
                    </div>
                    <div className="flex my-4">
                      <h2>Department:</h2>
                      <p className="ml-3">{actor?.known_for_department}</p>
                    </div>
                    <div className="flex my-4">
                      <h2>Status:</h2>
                      <p className="ml-3">
                        {!actor?.deathday
                          ? "Alive"
                          : `Died in ${actor?.deathday}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ActorMain actor={actor} actorID={actorID} />
        </>
      )}
    </motion.div>
  );
};

export default ActorDetails;
