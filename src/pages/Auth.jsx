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




// import React, { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { loginAPI } from "../services/allAPI";
// import { useAuth } from "../contexts/AuthContex";
// import Alert from '../components/Alert'

// const Auth = () => {
//   const navigate = useNavigate();
//   const { setUser } = useAuth(); 
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({ username: "", password: "" });

//   // Alert state
//   const [alert, setAlert] = useState({
//     show: false,
//     message: '',
//     type: 'success'
//   });

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

//   const showAlert = (message, type = 'success') => {
//     setAlert({
//       show: true,
//       message,
//       type
//     });
//   };

//   const hideAlert = () => {
//     setAlert({
//       ...alert,
//       show: false
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const result = await loginAPI(formData)
//         if (result.status === 200) {
//           sessionStorage.setItem("admin", JSON.stringify(result.data.user))
//           sessionStorage.setItem("token", result.data.token)

//           setUser({
//             ...result.data.user,
//             isAuthenticated: true
//           });

//           setFormData({ username: "", password: "" })

//           const userRole = result.data.user.role;
//           if (userRole === "admin") {
//             showAlert("welcome Admin Explore our Page")
//             navigate('/admin-panel');
//           } else if (userRole === "Schooladmin") {
//             showAlert("welcome Admin Explore our Page")
//             navigate('/');
//           }
//           else if (userRole === "subadmin") {
//             showAlert("welcome Admin Explore our Page")
//             navigate('/');
//           }
//           else if (userRole === "stateAdmin") {
//             showAlert("welcome Admin Explore our Page")
//             navigate('/');
//           }
//           else if (userRole === "districtAdmin") {
//             showAlert("welcome Admin Explore our Page")
//             navigate('/');
//           }
//           else {
//             navigate('/');
//           }
//         } else {
//           if (result.response && result.response.status === 404) {
//             showAlert(result.response.data, 'error')
//           }
//         }
//       } catch (err) {
//         console.log(err);
//         showAlert("Login failed. Please check your credentials.", 'error');
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">

//       {alert.show && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-md">
//           <Alert
//             message={alert.message}
//             type={alert.type}
//             onClose={hideAlert}
//             duration={5000}
//           />
//         </div>
//       )}

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

// export default Auth;



import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginAPI } from "../services/allAPI";
import { useAuth } from "../contexts/AuthContex";
import Alert from '../components/Alert'
import Splashscreen from '../components/Splashscreen'

const Auth = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);

  // Using useState with a function to guarantee initial state
  const [alert, setAlert] = useState(() => ({
    show: false,
    message: '',
    type: 'success'
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Separate effect for alert to ensure it's updated correctly
  useEffect(() => {
    let alertTimer;
    if (alert.show) {
      // Log every time alert state changes
      console.log("Alert state changed:", alert);
      
      alertTimer = setTimeout(() => {
        hideAlert();
      }, 5000);
    }
    return () => clearTimeout(alertTimer);
  }, [alert.show]);

  if (loading) {
    return <Splashscreen />;
  }

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
    console.log("showAlert called with:", message, type);
    setAlert({
      show: true,
      message: message || "Operation completed",
      type: type
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({
      ...prev,
      show: false
    }));
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
          
          // Make sure to call this with a non-empty message
          showAlert("Welcome Admin! Explore our Page", 'success');
          console.log("Alert shown:", alert); 
          
          setTimeout(() => {
            if (userRole === "admin") {
              navigate('/admin-panel');
            } else if (userRole === "Schooladmin" || 
                      userRole === "subadmin" || 
                      userRole === "stateAdmin" || 
                      userRole === "districtAdmin") {
              navigate('/');
            } else {
              navigate('/');
            }
          }, 1500);
        } else {
          if (result.response && result.response.status === 404) {
            showAlert(result.response.data || "User not found", 'error');
          } else {
            showAlert("Login failed. Please try again.", 'error');
          }
        }
      } catch (err) {
        console.log(err);
        showAlert("Login failed. Please check your credentials.", 'error');
      }
    } else {
      // Form validation failed - show error message
      // showAlert("Please correct the errors in the form", 'error');
    }
  };

  // Alert component directly in the Auth component with more visible styling
  const AlertComponent = () => {
    if (!alert.show) return null;
    
    const styles = {
      success: {
        bg: 'bg-green-500',
        text: 'text-white',
        icon: 'fa-check-circle'
      },
      error: {
        bg: 'bg-red-500',
        text: 'text-white',
        icon: 'fa-exclamation-circle'
      }
    };
    
    const style = styles[alert.type] || styles.success;
    
    return (
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div className={`${style.bg} p-4 rounded-md shadow-lg flex items-center justify-between`}>
          <div className="flex items-center">
            <i className={`fas ${style.icon} ${style.text} text-xl mr-3`}></i>
            <span className={`${style.text} font-medium text-base`}>{alert.message || "Operation completed"}</span>
          </div>
          <button 
            onClick={hideAlert}
            className={`${style.text} hover:text-gray-200`}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* Display alert */}
      {alert.show && <AlertComponent />}

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