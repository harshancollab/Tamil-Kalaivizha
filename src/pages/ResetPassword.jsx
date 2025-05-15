// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { resetPasswordAPI } from "../services/allAPI"
// import Alert from "../components/Alert";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Alert state
//   const [alert, setAlert] = useState({
//     show: false,
//     message: '',
//     type: 'success'
//   });

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

//   const validateEmail = () => {
//     if (!email.trim()) {
//       setError("Email is required");
//       return false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Invalid email format");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateEmail()) {
//       try {
//         setIsLoading(true);
//         const reqBody = { email_address: email };
//         const result = await resetPasswordAPI(reqBody);

//         if (result && result.status === 200) {
//           // Store email in session storage for verification page
//           sessionStorage.setItem("resetEmail", email);

//           showAlert('Verification code sent successfully!', 'success');

//           // Redirect to OTP verification page after a short delay
//           setTimeout(() => {
//             navigate("/otp-verification");
//           }, 1500);
//         } else {
//           if (result.response) {
//             showAlert(result.response.data.message || "Failed to send verification code. Please try again.", 'error');
//           } else {
//             showAlert("Failed to send verification code. Network error occurred.", 'error');
//           }
//         }
//       } catch (err) {
//         console.error("Reset password error:", err);
//         showAlert("Something went wrong. Please try again later.", 'error');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };


  

// if (isLoading) {
//         return (
//             <>
                
//                 <div className="flex flex-col md:flex-row min-h-screen">
                   
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }


//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
//         {/*Image */}
//         <div className="w-1/2 hidden md:block">
//           <img
//             src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
//             alt="Forgot Password"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">
//             <h2 className="text-2xl font-semibold text-gray-800 text-center">
//               Forgot Password
//             </h2>
//             <p className="text-gray-600 text-center mt-2">
//               Enter your email address to receive a verification code.
//             </p>
//             <form onSubmit={handleSubmit}>
//               <div className="mt-6">
//                 <label htmlFor="email" className="block text-blue-900 font-medium mb-1 ml-4">
//                   <i className="fa-regular fa-user"></i> Enter Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Example@gmail.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`w-full px-4 py-3 border border-black rounded-full shadow-sm focus:outline-none focus:ring-2 ${
//                     error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-dark-500"
//                   }`}
//                 />
//                 {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full mt-6 py-3 text-white font-semibold bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full hover:opacity-90 transition"
//               >
//                 {isLoading ? "Sending..." : "Send"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../services/allAPI";
import Alert from "../components/Alert";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true for initial load
  const navigate = useNavigate();

  // Alert state
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

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

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail()) {
      try {
        setIsLoading(true); // Set loading to true before API call
        const reqBody = { email_address: email };
        const result = await resetPasswordAPI(reqBody);

        if (result && result.status === 200) {
          // Store email in session storage for verification page
          sessionStorage.setItem("resetEmail", email);

          showAlert('Verification code sent successfully!', 'success');

          // Redirect to OTP verification page after a short delay
          setTimeout(() => {
            navigate("/otp-verification");
          }, 1500);
        } else {
          if (result.response) {
            showAlert(result.response.data.message || "Failed to send verification code. Please try again.", 'error');
          } else {
            showAlert("Failed to send verification code. Network error occurred.", 'error');
          }
        }
      } catch (err) {
        console.error("Reset password error:", err);
        showAlert("Something went wrong. Please try again later.", 'error');
      } finally {
        setIsLoading(true); // Set loading back to false after API call completes
      }
    }
  };

  // Simulate an initial loading period (replace with actual data fetching if needed)
  useEffect(() => {
    const initialLoadTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a short delay
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(initialLoadTimeout); // Cleanup the timeout if the component unmounts
  }, []);


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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {alert.show && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-md">
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={hideAlert}
            duration={5000}
          />
        </div>
      )}
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[850px]">
        {/*Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
            alt="Forgot Password"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Enter your email address to receive a verification code.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                <label htmlFor="email" className="block text-blue-900 font-medium mb-1 ml-4">
                  <i className="fa-regular fa-user"></i> Enter Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border border-black rounded-full shadow-sm focus:outline-none focus:ring-2 ${
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-dark-500"
                  }`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 py-3 text-white font-semibold bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full hover:opacity-90 transition"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;