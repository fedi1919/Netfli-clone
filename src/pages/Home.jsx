import React from "react";
import { motion } from "framer-motion";

import Main from "../compnents/Main";
import Row from "../compnents/Row";

import requests from "../Requests";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Main />
      <Row rowID="1" title="Top Rated" fetchUrl={requests.topRatedMovies} />
      <Row rowID="2" title="Trending" fetchUrl={requests.trendingMovies} />
      <Row rowID="3" title="UpComing" fetchUrl={requests.upcomingMovies} />
    </motion.div>
  );
};

export default Home;
