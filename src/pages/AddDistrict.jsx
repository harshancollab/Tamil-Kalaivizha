import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
// import { AddDistrictAPI } from '../services/allAPI';

const AddDistrict = () => {
  const navigate = useNavigate();
  const [districtName, setDistrictName] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormSubmitted(true);
    
    // Validate all fields
    const isValid = validateForm();
    
    if (isValid) {
      console.log("Form submitted:", { districtName });
      
      // Get token from session storage
      const token = sessionStorage.getItem("token");
      
      if (token) {
        // Set up request header with token
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };
        
        try {
          // Uncomment this when API is ready
          // const result = await AddDistrictAPI({ districtName }, reqHeader);
          
          // For now, simulating successful API call
          const result = { status: 200 };
          
          if (result.status === 200) {
            alert('District added successfully!');
            
            // Reset form after successful submission
            setDistrictName('');
            setFormSubmitted(false);
            
            // Navigate back to the list page
            navigate('/DistrictList');
          } else {
            alert("Failed to add district");
          }
        } catch (err) {
          console.error("Error adding district:", err);
          alert("Error adding district. Please try again.");
        }
      } else {
        alert("Authentication token missing. Please log in again.");
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex flex-col sm:flex-row">
          <Dash />
          <div className="flex-1 p-2 sm:p-4 bg-gray-300">
            <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto relative">
              <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add District</h2>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                {/* District Name Field */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District</label>
                  <div className="w-full sm:w-2/3">
                    <input
                      type="text"
                      name="districtName"
                      placeholder="Enter District"
                      value={districtName}
                      onChange={(e) => setDistrictName(e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 border ${errors.districtName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                    />
                    {errors.districtName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.districtName}</p>}
                  </div>
                </div>
              </form>
              
              <div className="absolute bottom-40 right-28 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-10 sm:px-10 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-10 sm:px-10 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
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

export default AddDistrict;