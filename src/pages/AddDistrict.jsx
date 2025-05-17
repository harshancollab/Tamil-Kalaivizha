// It admin add District Regtration

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Dash from '../components/Dash';
// import Alert from '../components/Alert';
// import { addDistrictAPI } from '../services/allAPI';


// const AddDistrict = () => {
//   const navigate = useNavigate();
//   const [districtName, setDistrictName] = useState('');
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // Improved alert state
//   const [alert, setAlert] = useState({
//     show: false,
//     message: '',
//     type: 'success'
//   });

//   const handleCancel = () => {
//     navigate('/DistrictList');
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!districtName.trim()) {
//       newErrors.districtName = 'District name is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Show alert function with better visibility handling
//   const showAlert = (message, type = 'success') => {
//     setAlert({
//       show: true,
//       message,
//       type
//     });

//     // Auto hide after 5 seconds
//     setTimeout(() => {
//       hideAlert();
//     }, 5000);
//   };

//   const hideAlert = () => {
//     setAlert(prev => ({
//       ...prev,
//       show: false
//     }));
//   };


//   const handleSubmit = async() => {


// const {district_name}  = districtName 
// if(district_name){
//   // alert("proceed to api")
//   const reqBody = new FormData()
//   reqBody.append("district_name",district_name)
//     const token = sessionStorage.getItem("token");
//     if(token){
//       const reqHeader = {
//         "Authorization": token
//       }
//       try{
// const result = await addDistrictAPI(reqBody,reqHeader)
// if(result.status==200){
//   alert("district added sucessfully")
// }else{
//   alert(result.response.data)
// }
//       }catch(err){
//         console.log(err);
        
//       }
//     }

// }else{
//   alert("please fill the fom completely")
// }
//   }


  


//   if (loading) {
//     return (
//       <>
//         <Header />
//         <div className="flex flex-col md:flex-row min-h-screen">
//           <Dash />
//           <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//             <div className="text-center">
//               <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//               <p className="mt-2 text-gray-600">Loading...</p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white min-h-screen">
//         <Header />
//         <div className="flex flex-col sm:flex-row">
//           <Dash />
//           <div className="flex-1 p-2 sm:p-4 bg-gray-300 relative">
//             {/* Alert positioned at the top center for better visibility */}
//             {alert.show && (
//               <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
//                 <Alert
//                   message={alert.message}
//                   type={alert.type}
//                   onClose={hideAlert}
//                 />
//               </div>
//             )}

//             <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto relative">
//               <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add District</h2>

//               <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
//                 <div className="flex flex-col sm:flex-row sm:items-center">
//                   <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District</label>
//                   <div className="w-full sm:w-2/3">
//                     <input
//                       type="text"
//                       name="districtName"
//                       placeholder="Enter District"
//                       value={districtName}
//                       onChange={(e) => setDistrictName(e.target.value)}
//                       className={`w-full px-3 sm:px-4 py-2 border ${formSubmitted && errors.districtName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                     />
//                     {formSubmitted && errors.districtName && (
//                       <p className="text-red-500 text-xs mt-1 ml-2">{errors.districtName}</p>
//                     )}
//                   </div>
//                 </div>
//               </form>

//               <div className="absolute bottom-40 right-28 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-10 sm:px-10 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-10 sm:px-10 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddDistrict;






// It admin add District Regtration















import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import Alert from '../components/Alert';
import { addDistrictAPI } from '../services/allAPI';

const AddDistrict = () => {
  const navigate = useNavigate();
  const [districtName, setDistrictName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Improved alert state with better defaults
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleCancel = () => {
    navigate('/DistrictList');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!districtName.trim()) {
      newErrors.districtName = 'District name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Set loading false after initial render
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Improved show alert function with better visibility and timing
  const showAlert = (message, type = 'success') => {
    // First hide any existing alert to prevent stacking
    setAlert({
      show: false,
      message: '',
      type: 'success'
    });

    // Use timeout to ensure state updates properly before showing new alert
    setTimeout(() => {
      setAlert({
        show: true,
        message,
        type
      });

      // Auto hide after 3 seconds
      setTimeout(() => {
        hideAlert();
      }, 3000);
    }, 100);
  };

  const hideAlert = () => {
    setAlert(prev => ({
      ...prev,
      show: false
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormSubmitted(true);

    // Validate fields
    const isValid = validateForm();

    if (isValid) {
      // Get token from session storage
      const token = sessionStorage.getItem("token");

      if (!token) {
        showAlert("Authentication token missing. Please log in again.", "error");
        return;
      }

      // Set up request header with token
      const reqHeader = {
        "Authorization": token
      };

      try {
        const requestBody = {
          district_name: districtName
        };

        // Call the API with the correct request body structure
        const result = await addDistrictAPI(requestBody, reqHeader);

        // Check if response indicates success (e.g., status code 2xx)
        if (result && (result.status >= 200 && result.status < 300)) {
          showAlert('District added successfully!', 'success');

          // Reset form and redirect after a short delay
          setTimeout(() => {
            setDistrictName('');
            setFormSubmitted(false);
            navigate('/DistrictList');
          }, 2000);
        } else if (result?.data?.message || result?.data?.error) {
          // Handle specific error messages from the API
          const errorMessage = result.data.message || result.data.error;
          if (errorMessage.toLowerCase().includes('already exists') || errorMessage.toLowerCase().includes('duplicate')) {
            showAlert('This district already exists!', 'error');
          } else {
            showAlert(errorMessage, 'error');
          }
        } else {
          // Handle unexpected errors
          showAlert('Error adding district. Please try again.', 'error');
        }
      } catch (err) {
        console.error("Error adding district:", err);
        if (err.response && err.response.data) {
          const errorMsg = err.response.data.message || err.response.data.error || '';
          if (errorMsg.toLowerCase().includes('already exists') ||
            errorMsg.toLowerCase().includes('duplicate')) {
            showAlert('This district already exists!', 'error');
          } else {
            showAlert(errorMsg || "Error adding district. Please try again.", "error");
          }
        } else {
          showAlert("Error adding district. Please try again.", "error");
        }
      }
    } else {
      // showAlert("Please fill all required fields", "error");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-col md:flex-row min-h-screen">
          <Dash />
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
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex flex-col sm:flex-row">
          <Dash />
          <div className="flex-1 p-2 sm:p-4 bg-gray-300 relative">
            {/* Alert positioned with better visibility and styling */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
              {alert.show && (
                <Alert
                  message={alert.message}
                  type={alert.type}
                  onClose={hideAlert}
                />
              )}
            </div>

            <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto relative">
              <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add District</h2>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District</label>
                  <div className="w-full sm:w-2/3">
                    <input
                      type="text"
                      name="districtName"
                      placeholder="Enter District"
                      value={districtName}
                      onChange={(e) => setDistrictName(e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 border ${formSubmitted && errors.districtName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                    />
                    {formSubmitted && errors.districtName && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{errors.districtName}</p>
                    )}
                  </div>
                </div>
              </form>

              <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:px-10 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:px-10 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDistrict