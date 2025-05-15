// SplashScreen.js
import React from 'react'
import logo from "../assets/Logo.png"

const Splashscreen = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <img
       src={logo}
        alt="Logo"
        className="w-32 h-32 "
      />
      {/* <h1>loading...</h1> */}
    </div>
  );
};


export default Splashscreen