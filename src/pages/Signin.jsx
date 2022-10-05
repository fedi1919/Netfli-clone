import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { signin } = UserAuth();

  const handleSigin = async (e) => {
    e.preventDefault();

    try {
      await signin(email, password);

      navigate("/");
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("user")) {
        setEmailError(true);
        setPasswordError(false);
      } else {
        setPasswordError(true);
        setEmailError(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute object-cover w-full h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className=" bg-black/60 fixed top-0 left-0 h-screen w-full"></div>
        <div className="fixed w-full px-4 py-16 ">
          <div className="max-w-[450px] h-[550px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] m-auto py-16 ">
              <h1 className="text-3xl font-bold">Sign In</h1>
              {emailError ? (
                <p className="rounded  p-3 my-2  bg-red-600 text-white font-bold text-lg">
                  User Not Found
                </p>
              ) : null}
              {passwordError ? (
                <p className="rounded  p-3 my-2  bg-red-600 text-white font-bold text-lg">
                  Wrong Password
                </p>
              ) : null}
              <form
                className="w-full flex flex-col py-4"
                onSubmit={handleSigin}
              >
                <input
                  className="p-3 my-2 bg-gray-800 rounded"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  className="p-3 my-2 bg-gray-800 rounded"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button className="bg-red-600 hover:bg-red-700   py-3 my-6 rounded font-bold">
                  Sign In
                </button>
                <div className="flex justify-between items-center text-lg text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">New to Netflix ?</span>
                  <Link className="ml-1" to="/signup">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signin;
