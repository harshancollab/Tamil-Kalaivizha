// It Admin when user click distr reg -distname - subdist - Add Sub

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import Alert from '../components/Alert'
// import { AddSubDistrictAPI } from '../services/allAPI';

const AddSubDistrict = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dropdownRef = useRef(null);
  
  const availableDistricts = [
    'Idukki',
    'Ernakulam',
    'Palakkad',
    'Kozhikode',
    'Wayanad',
    'Thrissur',
    "Kannur",
    "Kasrkode"
  ];

  const [formData, setFormData] = useState({
    district: '',
    subDistrictName: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // New state for custom dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(availableDistricts);
    const [loading, setLoading] = useState(true);
      // Alert state
      const [alert, setAlert] = useState({
          show: false,
          message: '',
          type: 'success'
      });

  useEffect(() => {
    const districtFromUrl = searchParams.get('district');
    
    if (districtFromUrl) {
      setFormData(prev => ({...prev, district: districtFromUrl}));
    } 
    else if (location.state && location.state.districtName) {
      setFormData(prev => ({...prev, district: location.state.districtName}));
      
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('district', location.state.districtName);
      navigate({
        pathname: location.pathname,
        search: newSearchParams.toString()
      }, { replace: true });
    }
  }, [location, searchParams, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Filter districts based on search term
  useEffect(() => {
    const filtered = availableDistricts.filter(district => 
      district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDistricts(filtered);
  }, [searchTerm]);

  const updateUrlWithDistrict = (district) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (district && district !== 'Select District') {
      newSearchParams.set('district', district);
    } else {
      newSearchParams.delete('district');
    }
    
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString()
    }, { replace: true });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    // If district is changed, update the URL
    if (name === 'district') {
      updateUrlWithDistrict(value);
    }
  };

  const handleDistrictSelect = (district) => {
    setFormData(prev => ({
      ...prev,
      district
    }));
    
    setTouched(prev => ({
      ...prev,
      district: true
    }));
    
    if (errors.district) {
      setErrors(prev => ({
        ...prev,
        district: null
      }));
    }

    updateUrlWithDistrict(district);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleCancel = () => {
    const districtParam = formData.district ? `?district=${encodeURIComponent(formData.district)}` : '';
    navigate(`/SubDistrictlist${districtParam}`);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.district) {
      newErrors.district = 'Please select a district';
    }
    
    if (!formData.subDistrictName?.trim()) {
      newErrors.subDistrictName = 'Sub-District name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormSubmitted(true);
    
    setTouched({
      district: true,
      subDistrictName: true
    });
    
    const isValid = validateForm();
    
    if (isValid) {
      console.log("Form submitted:", formData);
      
      // Get token from session storage
      const token = sessionStorage.getItem("token");
      
      if (token) {
        // Set up request header with token
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };
        
        try {
          // const result = await AddSubDistrictAPI(formData, reqHeader);
          
          // Mock successful response for demonstration
          const result = { status: 200 };
          
          if (result.status === 200) {
            showAlert('Sub-District added successfully!');
            
            setFormData(prev => ({...prev, subDistrictName: ''}));
            setFormSubmitted(false);
            
            navigate(`/SubDistrictlist?district=${encodeURIComponent(formData.district)}`);
          } else {
            showAlert("Failed to add sub-district");
          }
        } catch (err) {
          console.error("Error adding sub-district:", err);
          showAlert("Error adding sub-district. Please try again.");
        }
      } else {
        showAlert("Authentication token missing. Please log in again.");
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  
  const renderDistrictDropdown = () => {
    const showSearchBar = availableDistricts.length > 7;
    
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <div 
          className={`flex items-center w-full px-3 py-2 border ${errors.district ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white cursor-pointer`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={`flex-grow ${!formData.district ? 'text-gray-400' : ''}`}>
            {formData.district || 'Select District'}
          </span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {showSearchBar && (
              <div className="sticky top-0 p-2 bg-white border-b border-gray-200">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search districts..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            <div className="py-1">
              {filteredDistricts.length > 0 ? (
                filteredDistricts.map((district, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer ${formData.district === district ? 'bg-blue-50 text-blue-700' : ''}`}
                    onClick={() => handleDistrictSelect(district)}
                  >
                    {district}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No districts found</div>
              )}
            </div>
          </div>
        )}
        
        {touched.district && errors.district && (
          <p className="text-red-500 text-xs mt-1 ml-2">{errors.district}</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex flex-col sm:flex-row">
          <Dash />
           {alert.show && (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={hideAlert}
                            duration={5000}
                        />
                    )}
          <div className="flex-1 p-2 sm:p-4 bg-gray-300">
            <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto relative">
              <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add Sub District</h2>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="district" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District</label>
                  <div className="w-full sm:w-2/3">
                    {renderDistrictDropdown()}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="subDistrictName" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub District</label>
                  <div className="w-full sm:w-2/3">
                    <input
                      type="text"
                      id="subDistrictName"
                      name="subDistrictName"
                      placeholder="Enter Sub District"
                      value={formData.subDistrictName || ''}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.subDistrictName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                    />
                    {touched.subDistrictName && errors.subDistrictName && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{errors.subDistrictName}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-10 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubDistrict