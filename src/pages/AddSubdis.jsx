// It admin SUb distric reg  add sub 


import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Dash from '../components/Dash'
import Alert from '../components/Alert'
import { AddSubDistrictAPI, getAllDistrictAPI } from '../services/allAPI'

const AddSubdis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Single loading state for API operations
  const [isLoading, setIsLoading] = useState(true);

  // Alert state
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // State for storing districts with IDs
  const [availableDistricts, setAvailableDistricts] = useState([]);

  const [formData, setFormData] = useState({
    district: searchParams.get('district') || '',
    district_id: '', // Add district_id field
    sub_district_name: '' // Changed to match API expectation
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const districtDropdownRef = useRef(null);

  useEffect(() => {
    const getDistricts = async () => {
     
      try {
        const token = sessionStorage.getItem("token");

        if (token) {
          const reqHeader = {
            "Authorization": token
          };

          const result = await getAllDistrictAPI(reqHeader);

          if (result.status === 200) {
            // Map the API response to match the expected format
            const districts = result.data.district.map(item => ({
              _id: item._id,
              name: item.district_name // Map district_name to name
            }));

            setAvailableDistricts(districts);

            // If district name is in URL, find and set the corresponding district_id
            const districtFromUrl = searchParams.get('district');
            if (districtFromUrl) {
              const district = districts.find(d => d.name === districtFromUrl);
              if (district) {
                setFormData(prev => ({
                  ...prev,
                  district: district.name,
                  district_id: district._id
                }));
              }
            }
          } else {
            console.error("Error fetching districts:", result.response?.data);
          }
        } else {
          console.warn("No authentication token found");
        }
      } catch (err) {
        console.error("Error in fetching districts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getDistricts();
  }, [searchParams]);
  
  const filteredDistricts = searchText.length > 0
    ? availableDistricts.filter(district =>
      district.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : availableDistricts;

  useEffect(() => {
    const districtFromUrl = searchParams.get('district');

    if (districtFromUrl && availableDistricts.length > 0) {
      const district = availableDistricts.find(d => d.name === districtFromUrl);
      if (district) {
        setFormData(prev => ({
          ...prev,
          district: district.name,
          district_id: district._id
        }));
      }
    }
    else if (location.state && location.state.districtName && availableDistricts.length > 0) {
      const district = availableDistricts.find(d => d.name === location.state.districtName);
      if (district) {
        setFormData(prev => ({
          ...prev,
          district: district.name,
          district_id: district._id
        }));

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('district', district.name);
        setSearchParams(newSearchParams);
      }
    }
  }, [location, searchParams, setSearchParams, availableDistricts]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const updateUrlWithDistrict = (districtName) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (districtName && districtName !== 'Select') {
      newSearchParams.set('district', districtName);
    } else {
      newSearchParams.delete('district');
    }

    setSearchParams(newSearchParams);
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
  };

  const handleCancel = () => {
    const districtParam = formData.district ? `?district=${encodeURIComponent(formData.district)}` : '';
    navigate(`/SubDisRegList${districtParam}`);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.district || !formData.district_id) {
      newErrors.district = 'Please select a district';
    }

    if (!formData.sub_district_name?.trim()) {
      newErrors.sub_district_name = 'Sub-District name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormSubmitted(true);
    setTouched({
      district: true,
      sub_district_name: true
    });
    const isValid = validateForm();
    if (isValid) {
     
      const requestBody = {
        district_id: formData.district_id,
        sub_district_name: formData.sub_district_name
      };
      console.log("Form data being submitted:", requestBody);
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const reqHeader = {
            "Authorization": token
          };
          const result = await AddSubDistrictAPI(requestBody, reqHeader);
          if (result.status === 200) {
            showAlert('Sub-District added successfully!');
            setFormData(prev => ({ ...prev, sub_district_name: '' }));
            setFormSubmitted(false);
            navigate(`/SubDisRegList?district=${encodeURIComponent(formData.district)}`);
          } else {
            showAlert(result.response?.data?.message || "Error adding sub-district", "error");
          }
        } else {
          showAlert("Authentication token missing. Please log in again.", "error");
        }
      } catch (err) {
        console.error("Error adding sub-district:", err);
        showAlert(err.response?.data?.message || "Error adding sub-district. Please try again.", "error");
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const handleDistrictSelect = (district) => {
    if (district === 'No results found') return;

    setFormData(prev => ({
      ...prev,
      district: district.name,
      district_id: district._id
    }));

    updateUrlWithDistrict(district.name);

    setDropdownOpen(false);

    setErrors(prev => ({ ...prev, district: null }));
    setTouched(prev => ({ ...prev, district: true }));
  };

  const CustomSelect = ({
    label,
    name,
    value,
    error,
    disabled = false,
    placeholder
  }) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">{label}</label>
        <div className="w-full sm:w-2/3 relative" ref={districtDropdownRef}>
          <div
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${disabled ? 'opacity-75' : ''}`}
            onClick={toggleDropdown}
          >
            <span className={value ? "text-blue-900" : "text-gray-400"}>
              {value || placeholder}
            </span>
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}

          {dropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-2 border-b">
                <input
                  type="text"
                  placeholder="Search district..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="max-h-48 overflow-y-auto">
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district, index) => (
                    <div
                      key={district._id}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.district === district.name ? 'bg-blue-200' : ''}`}
                      onClick={() => handleDistrictSelect(district)}
                    >
                      {district.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>
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

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-gray-600">Loading...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                  <CustomSelect
                    label="District"
                    name="district"
                    value={formData.district}
                    error={touched.district && errors.district}
                    placeholder="Select District"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub District</label>
                    <div className="w-full sm:w-2/3">
                      <input
                        type="text"
                        name="sub_district_name"
                        placeholder="Enter Sub District"
                        value={formData.sub_district_name || ''}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${touched.sub_district_name && errors.sub_district_name ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                      />
                      {touched.sub_district_name && errors.sub_district_name && (
                        <p className="text-red-500 text-xs mt-1 ml-2">{errors.sub_district_name}</p>
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
                      disabled={isLoading}
                      className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-10 sm:px-10 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
                    >
                      {isLoading ? 'Adding...' : 'Add'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubdis;