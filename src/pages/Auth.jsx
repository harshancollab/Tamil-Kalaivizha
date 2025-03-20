import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: "", password: "" };

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // alert("Wlcome explore our site !!!")
            console.log("Form submitted", formData);


        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[850px]">
                {/* image */}
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">


                    {/* <div className="flex items-center bg-gray-100 rounded-full p-1 w-64 mb-5">
                        <button className="flex-1 py-2  text-lg font-semibold text-black bg-yellow-500 rounded-full shadow-md">
                            Login
                        </button>
                        <button onClick={() => navigate("/register")} className="flex-1  py-2 text-lg font-semibold text-gray-600 rounded-full">
                            Register
                        </button>
                    </div> */}



                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome to <span className="text-blue-500 ">Kalaivizha</span>
                    </h2>
                    <p className="text-gray-600 mb-4">Please login to your account</p>
                    <form onSubmit={handleSubmit}>
  <div className="mb-3">  
    <label htmlFor="email" className="block text-blue-900 font-medium mb-1 ml-2">
    <i class="fa-regular fa-user"></i>    Email
    </label>
    <input 
      id="email"
      name="email"
      type="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
      className={`w-full p-3 border border-black ${
        errors.email ? "border-red-500" : "border-gray-300"
      } rounded-full focus:ring-2 focus:ring-blue-400`}
    />
    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="block text-blue-900 font-medium ml-2 mb-1">
    <i class="fa-solid fa-lock"></i> Password
    </label>
    <input
      id="password"
      name="password"
      type="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      className={`w-full p-3 border border-black ${
        errors.password ? "border-red-500" : "border-gray-300"
      } rounded-full focus:ring-2 focus:ring-blue-400`}
    />
    {errors.password && (
      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
    )}
  </div>

  <div className="flex justify-between items-center mb-3">
    <label className="flex items-center text-gray-600">
      <input type="checkbox" className="mr-2" /> Remember me
    </label>
    <Link to="/reset" className="text-yellow-500 text-sm">
      Forgot Password?
    </Link>
  </div>

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-[#003566] to-[#05B9F4] mt-5 text-white py-2 rounded-full hover:bg-blue-600 transition"
  >
    Login to your account
  </button>
</form>

                </div>
            </div>
        </div>
    );
};

export default Auth;
