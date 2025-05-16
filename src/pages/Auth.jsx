

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/allAPI";
import { useAuth } from "../contexts/AuthContex";
import Alert from '../components/Alert';

const Auth = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Alert state
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

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

  const showAlert = (message, type = 'success') => {
    setAlert({
      show: true,
      message,
      type
    });
  };

  const hideAlert = () => {
    setAlert({
      ...alert,
      show: false
    });
  };



// Function to decode JWT token
const decodeToken = (token) => {
  try {
    // JWT tokens are split into three parts separated by dots
    const payload = token.split('.')[1];
    // The payload is base64 encoded - decode it and parse as JSON
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
     
      const reqBody = {
        username: formData.username,
        password: formData.password,
      };
      const result = await loginAPI(reqBody);
      
      if (result && result.status === 200) {
        // Store token in session storage
        const token = result.data.token;
        sessionStorage.setItem("token", token);
        
        // Decode token to get user information
        const decodedToken = decodeToken(token);
        console.log("Decoded token:", decodedToken); // Debug: Check what's in the token
        
        // Extract user data from the decoded token
        const userData = decodedToken.users || decodedToken.user || decodedToken;
        
        // Store user data for convenience
        sessionStorage.setItem("users", JSON.stringify(userData));
        
        // Get user type from decoded token
        const userType = userData.user_type;
        console.log("User type from token:", userType); 
        
        // Set user in state
        setUser({
          ...userData,
          isAuthenticated: true
        });
        
        setFormData({ username: "", password: "" });
        showAlert(`Welcome ${userData.username || userData.name || 'user'}! Explore our page`, 'success');
        
        // Redirect based on user type
        setTimeout(() => {
          if (userType === "It Admin") {
            navigate('/admin-panel');
          } else if (["State Admin", "School admin", "subadmin", "District Admin"].includes(userType)) {
            navigate('/');
          } else {
            navigate('/');
          }
        }, 1500);
      } else {
        if (result.response) {
          showAlert(result.response.data.message || "Login failed. Please check your credentials.", 'error');
        } else {
          showAlert("Login failed. Network error occurred.", 'error');
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      showAlert("Login failed. Please try again later.", 'error');
    } finally {
      setIsLoading(false);
    }
  }
};


if (isLoading) {
        return (
            <>
                
                <div className="flex flex-col md:flex-row min-h-screen">
                   
                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-gray-600">Loading...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {alert.show && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={hideAlert}
            duration={5000}
          />
        </div>
      )}

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
                <i className="fa-regular fa-user"></i> Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-full focus:ring-2 focus:ring-blue-400`}
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
                className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-full focus:ring-2 focus:ring-blue-400`}
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#003566] to-[#05B9F4] mt-5 text-white py-2 rounded-full hover:bg-blue-600 transition flex justify-center items-center"
            >
              {isLoading ? (
                <span className="inline-block animate-spin mr-2">&#9696;</span>
              ) : null}
              {isLoading ? "Logging in..." : "Login to your account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;













// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginAPI } from "../services/allAPI";
// import { useAuth } from "../contexts/AuthContex";
// import Splashscreen from '../components/Splashscreen';

// const Auth = () => {
//   const navigate = useNavigate();
//   const { setUser } = useAuth();
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({
//     show: false,
//     message: "",
//     type: "success"
//   });

//   useEffect(() => {
//     // Simulate loading for splash screen
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Handle alert display and auto-dismiss
//   useEffect(() => {
//     let alertTimer;
//     if (alert.show) {
//       alertTimer = setTimeout(() => {
//         hideAlert();
//       }, 5000);
//     }
//     return () => clearTimeout(alertTimer);
//   }, [alert.show]);

//   if (loading) {
//     return <Splashscreen />;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { username: "", password: "" };

//     if (!formData.username.trim()) {
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

//   const showAlert = (message, type = "success") => {
//     setAlert({
//       show: true,
//       message: message || "Operation completed",
//       type: type
//     });
//   };

//   const hideAlert = () => {
//     setAlert(prev => ({
//       ...prev,
//       show: false
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       try {
//         // Log the request being sent
//         console.log("Attempting login with:", { 
//           username: formData.username,
//           // Don't log the actual password in production
//           passwordLength: formData.password.length 
//         });
        
//         const result = await loginAPI(formData);
//         console.log("Login API response:", result);
        
//         if (result.status === 200) {
//           // Store user data and token
//           sessionStorage.setItem("username", JSON.stringify(result.data.user));
//           sessionStorage.setItem("token", result.data.token);

//           // Update auth context
//           setUser({
//             ...result.data.user,
//             isAuthenticated: true
//           });

//           // Reset form
//           setFormData({ username: "", password: "" });

//           // Get user role
//           const userRole = result.data.user.role || result.data.user.user_type;
          
//           // Show welcome message
//           showAlert(`Welcome ${result.data.user.username || formData.username}! Logging you in...`, "success");
          
//           // Navigate based on role after a short delay
//           setTimeout(() => {
//             if (userRole === "Admin" || userRole === "admin") {
//               navigate('/admin-panel');
//             } else if (
//               userRole === "State Admin" || 
//               userRole === "Schooladmin" || 
//               userRole === "subadmin" || 
//               userRole === "stateAdmin" || 
//               userRole === "districtAdmin"
//             ) {
//               navigate('/');
//             } else {
//               navigate('/');
//             }
//           }, 1500);
//         } else {
//           showAlert("Login failed. Please check your credentials.", "error");
//         }
//       } catch (err) {
//         console.error("Login error:", err);
        
//         // More detailed error handling
//         if (err.response) {
//           console.log("Error response:", err.response);
//           if (err.response.status === 404) {
//             showAlert("User not found. Please check your username.", "error");
//           } else if (err.response.status === 401) {
//             showAlert("Invalid password. Please try again.", "error");
//           } else {
//             showAlert(err.response.data?.message || "Login failed. Please try again.", "error");
//           }
//         } else {
//           showAlert("Network error. Please check your connection.", "error");
//         }
//       }
//     }
//   };

//   // Alert component
//   const AlertComponent = () => {
//     if (!alert.show) return null;
    
//     const styles = {
//       success: {
//         bg: 'bg-green-500',
//         text: 'text-white',
//         icon: 'fa-check-circle'
//       },
//       error: {
//         bg: 'bg-red-500',
//         text: 'text-white',
//         icon: 'fa-exclamation-circle'
//       }
//     };
    
//     const style = styles[alert.type] || styles.success;
    
//     return (
//       <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
//         <div className={`${style.bg} p-4 rounded-md shadow-lg flex items-center justify-between`}>
//           <div className="flex items-center">
//             <i className={`fas ${style.icon} ${style.text} text-xl mr-3`}></i>
//             <span className={`${style.text} font-medium text-base`}>{alert.message}</span>
//           </div>
//           <button 
//             onClick={hideAlert}
//             className={`${style.text} hover:text-gray-200`}
//           >
//             <i className="fas fa-times"></i>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
//       {/* Display alert */}
//       <AlertComponent />

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
//                 <i className="fa-regular fa-user"></i> Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className={`w-full p-3 border ${errors.username ? "border-red-500" : "border-black"} rounded-full focus:ring-2 focus:ring-blue-400`}
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
//                 className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-black"} rounded-full focus:ring-2 focus:ring-blue-400`}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             <div className="flex justify-between items-center mb-3">
//               <label className="flex items-center text-gray-600">
//                 <input type="checkbox" className="mr-2" /> Remember me
//               </label>
//               <a href="/reset" className="text-yellow-500 text-sm">
//                 Forgot Password?
//               </a>
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

// export default Auth;