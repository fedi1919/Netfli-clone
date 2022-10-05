import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Account from "../pages/Account";
import ActorDetails from "../pages/ActorDetails";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Signin from "../pages/Signin";
import SignUp from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} exact />
        <Route
          path="/movie/:movieID"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/actor/:actorID"
          element={
            <ProtectedRoute>
              <ActorDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
