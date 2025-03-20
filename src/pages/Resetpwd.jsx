import React, { useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"

const Resetpwd = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true); 
    console.log("Reset link sent to:", email);

   
    setTimeout(() => {
      setShowAlert(false);
      navigate("/otp");
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx3JTvteRc7CDqzeqAQ1wgjy8iIMm5n5jF9A&s"
            alt="Reset Password"
            className="mx-auto w-32 mb-4"
          />

          {showAlert && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-bounce">
               Reset link sent to your email!
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800">
            Enter Your Email to Reset Password
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            We will send a reset link to your registered EmailId. Kindly follow the link in the email to reset your password. <br />
            <span className="font-semibold text-red-500">(Link Valid for 15 Min)</span>
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="mt-4 w-32 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Resetpwd
