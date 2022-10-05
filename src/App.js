import React from "react";

import { AuthContextProvider } from "./context/AuthContext";

import Navbar from "./compnents/Navbar";
import Footer from "./compnents/Footer";
import AnimatedRoutes from "./compnents/AnimatedRoutes";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
