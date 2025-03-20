import React, { useState } from 'react'
import Header from '../components/Header'

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length < 4) {
      setAlert({ show: true, message: "Please enter a valid 4-digit OTP!", type: "error" });
      return;
    }

    setAlert({ show: true, message: `OTP Submitted: ${otpValue}`, type: "success" });

    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
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

          <h2 className="text-xl font-semibold mt-12">OTP Verification</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter the 4-digit verification code that was sent to your email to change your password.
          </p>
          {alert.show && (
            <div className={`mt-4 px-4 py-3 rounded-md ${alert.type === "success" ? "bg-green-100 border border-green-500 text-green-700" : "bg-red-100 border border-red-500 text-red-700"}`}>
              <span>{alert.message}</span>
              <button onClick={() => setAlert({ show: false, message: "", type: "" })} className="ml-2 font-bold text-lg text-gray-700 hover:text-gray-900">
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex justify-center gap-3">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Could not receive a verification code yet? <br />
              <button className="text-yellow-500 font-semibold ml-1 hover:underline">Resend Code</button>
            </p>
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:opacity-90 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp
