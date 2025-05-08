// import React, { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { loginAPI } from "../services/allAPI";
// import login from "../assets/Login.png"

// const Auth = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   // const [inputData,setInputData] =useState({
//   //   email:"",password:""
//   // })
//   console.log(formData);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { email: "", password: "" };

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Enter a valid email address";
//       isValid = false;
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const result = await loginAPI(formData)
//         if (result.status == 200) {
//           sessionStorage.setItem("admin", JSON.stringify(result.data.user))
//           sessionStorage.setItem("token", result.data.token)
//           setFormData({ email: "", password: "" })
//           navigate('/admin-panel')

//         } else {
//           if (result.response.status == 404) {
//             alert(result.response.data)
//           }
//         }
//         console.log(result);


//       } catch (err) {
//         console.log(err);

//       }
//       // alert("Wlcome explore our site !!!")
//       // alert("make api call")
//       console.log("Form submitted", formData);


//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[850px]">
//         {/* image */}
//         <div className="w-1/2 hidden md:block">
//           <img
//             src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
//             alt="Login"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="w-full md:w-1/2 p-8">


//           {/* <div className="flex items-center bg-gray-100 rounded-full p-1 w-64 mb-5">
//                         <button className="flex-1 py-2  text-lg font-semibold text-black bg-yellow-500 rounded-full shadow-md">
//                             Login
//                         </button>
//                         <button onClick={() => navigate("/register")} className="flex-1  py-2 text-lg font-semibold text-gray-600 rounded-full">
//                             Register
//                         </button>
//                     </div> */}



//           <h2 className="text-2xl font-bold text-gray-800">
//             Welcome to <span className="text-blue-500 ">Kalaivizha</span>
//           </h2>
//           <p className="text-gray-600 mb-4">Please login to your account</p>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="email" className="block text-blue-900 font-medium mb-1 ml-2">
//                 <i class="fa-regular fa-user"></i>    Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full p-3 border border-black ${errors.email ? "border-red-500" : "border-gray-300"
//                   } rounded-full focus:ring-2 focus:ring-blue-400`}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="password" className="block text-blue-900 font-medium ml-2 mb-1">
//                 <i class="fa-solid fa-lock"></i> Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full p-3 border border-black ${errors.password ? "border-red-500" : "border-gray-300"
//                   } rounded-full focus:ring-2 focus:ring-blue-400`}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             <div className="flex justify-between items-center mb-3">
//               <label className="flex items-center text-gray-600">
//                 <input type="checkbox" className="mr-2" /> Remember me
//               </label>
//               <Link to="/reset" className="text-yellow-500 text-sm">
//                 Forgot Password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-[#003566] to-[#05B9F4] mt-5 text-white py-2 rounded-full hover:bg-blue-600 transition"
//             >
//               Login to your account
//             </button>
//           </form>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth

// import React, { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { loginAPI } from "../services/allAPI";
// import login from "../assets/Login.png"

// const Auth = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({ username: "", password: "" });
//   console.log(formData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { username: "", password: "" };

//     if (!formData.username) {
//       newErrors.username = "Username is required";
//       isValid = false;
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const result = await loginAPI(formData)
//         if (result.status === 200) {
//           // Store user data and token in session storage
//           sessionStorage.setItem("admin", JSON.stringify(result.data.user))
//           sessionStorage.setItem("token", result.data.token)
          
//           // Reset form fields
//           setFormData({ username: "", password: "" })
          
//           // Role-based redirection
//           const userRole = result.data.user.role;
//           if (userRole === "admin") {
//             alert("welcome Admin Explore our Page")
//             navigate('/admin-panel');
//           } else if (userRole === "Schooladmin") {
//             navigate('/');
//           } else {
//             // Default redirection if role is not specified
//             navigate('/');
//           }
//         } else {
//           if (result.response && result.response.status === 404) {
//             alert(result.response.data)
//           }
//         }
//         console.log(result);
//       } catch (err) {
//         console.log(err);
//         alert("Login failed. Please check your credentials.");
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[850px]">
//         {/* image */}
//         <div className="w-1/2 hidden md:block">
//           <img
//             src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
//             alt="Login"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Welcome to <span className="text-blue-500">Kalaivizha</span>
//           </h2>
//           <p className="text-gray-600 mb-4">Please login to your account</p>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="username" className="block text-blue-900 font-medium mb-1 ml-2">
//                 <i className="fa-regular fa-user"></i>    Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className={`w-full p-3 border border-black ${errors.username ? "border-red-500" : "border-gray-300"
//                   } rounded-full focus:ring-2 focus:ring-blue-400`}
//               />
//               {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="password" className="block text-blue-900 font-medium ml-2 mb-1">
//                 <i className="fa-solid fa-lock"></i> Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full p-3 border border-black ${errors.password ? "border-red-500" : "border-gray-300"
//                   } rounded-full focus:ring-2 focus:ring-blue-400`}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             <div className="flex justify-between items-center mb-3">
//               <label className="flex items-center text-gray-600">
//                 <input type="checkbox" className="mr-2" /> Remember me
//               </label>
//               <Link to="/reset" className="text-yellow-500 text-sm">
//                 Forgot Password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-[#003566] to-[#05B9F4] mt-5 text-white py-2 rounded-full hover:bg-blue-600 transition"
//             >
//               Login to your account
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth




  import React, { useState } from "react"
  import { Link, useNavigate } from "react-router-dom"
  import { loginAPI } from "../services/allAPI";
  import { useAuth } from "../contexts/AuthContex";
  
  const Auth = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth(); // Get the setUser function from context
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "" });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    };
  
    const validateForm = () => {
      let isValid = true;
      const newErrors = { username: "", password: "" };
  
      if (!formData.username) {
        newErrors.username = "Username is required";
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const result = await loginAPI(formData)
          if (result.status === 200) {
            sessionStorage.setItem("admin", JSON.stringify(result.data.user))
            sessionStorage.setItem("token", result.data.token)
            
            setUser({
              ...result.data.user,
              isAuthenticated: true
            });
            
            setFormData({ username: "", password: "" })
            
            const userRole = result.data.user.role;
            if (userRole === "admin") {
              alert("welcome Admin Explore our Page")
              navigate('/admin-panel');
            } else if (userRole === "Schooladmin") {
              navigate('/');
            }
            else if (userRole === "subadmin") {
              navigate('/');
            }
            else if (userRole === "stateAdmin") {
              navigate('/');
            }
            else if (userRole === "districtAdmin") {
              navigate('/');
            }
            else {
              navigate('/');
            }
          } else {
            if (result.response && result.response.status === 404) {
              alert(result.response.data)
            }
          }
        } catch (err) {
          console.log(err);
          alert("Login failed. Please check your credentials.");
        }
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
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to <span className="text-blue-500">Kalaivizha</span>
          </h2>
          <p className="text-gray-600 mb-4">Please login to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="block text-blue-900 font-medium mb-1 ml-2">
                <i className="fa-regular fa-user"></i>    Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-3 border border-black ${errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:ring-2 focus:ring-blue-400`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-blue-900 font-medium ml-2 mb-1">
                <i className="fa-solid fa-lock"></i> Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 border border-black ${errors.password ? "border-red-500" : "border-gray-300"
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