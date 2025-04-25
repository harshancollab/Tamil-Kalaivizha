// It admin SUb distric reg  add sub 
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
// import { AddSubDistrictAPI, fetchDistrictsAPI } from '../services/allAPI'; // Import API functions

const AddSubdis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [availableDistricts, setAvailableDistricts] = useState([]);
  
  const [formData, setFormData] = useState({
    district: searchParams.get('district') || '',
    subDistrictName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
 
  const districtDropdownRef = useRef(null);

  useEffect(() => {
    const getDistricts = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          };
          
          const result = await fetchDistrictsAPI(reqHeader);
          
          if (result.status === 200) {
            setAvailableDistricts(result.data || []);
          } else {
            setAvailableDistricts([
              'Idukki',
              'Ernakulam',
              'Palakkad',
              'Kozhikode',
              'Wayanad',
              'Thrissur',
            ]);
            console.error("Error fetching districts:", result.response?.data);
          }
        } else {
          // Fallback if no token
          setAvailableDistricts([
            'Idukki',
            'Ernakulam',
            'Palakkad',
            'Kozhikode',
            'Wayanad',
            'Thrissur',
          ]);
          console.warn("No authentication token found");
        }
      } catch (err) {
        console.error("Error in fetching districts:", err);
        setAvailableDistricts([
          'Idukki',
          'Ernakulam',
          'Palakkad',
          'Kozhikode',
          'Wayanad',
          'Thrissur',
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    getDistricts();
  }, []);

  const filteredDistricts = searchText.length > 0
    ? availableDistricts.filter(district => 
        district.toLowerCase().includes(searchText.toLowerCase())
      )
    : availableDistricts;

  useEffect(() => {
    const districtFromUrl = searchParams.get('district');
    
    if (districtFromUrl) {
      setFormData(prev => ({...prev, district: districtFromUrl}));
    } 
    else if (location.state && location.state.districtName) {
      setFormData(prev => ({...prev, district: location.state.districtName}));
      
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('district', location.state.districtName);
      setSearchParams(newSearchParams);
    }
  }, [location, searchParams, setSearchParams]);

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

  const updateUrlWithDistrict = (district) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (district && district !== 'Select') {
      newSearchParams.set('district', district);
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
    
    if (!formData.district) {
      newErrors.district = 'Please select a district';
    }
    
    if (!formData.subDistrictName?.trim()) {
      newErrors.subDistrictName = 'Sub-District name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      setIsLoading(true);
      console.log("Form data being submitted:", formData);
      
      try {
        const token = sessionStorage.getItem("token");
        
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          };
          
          const result = await AddSubDistrictAPI(formData, reqHeader);
          
          if (result.status === 200) {
            alert('Sub-District added successfully!');
            
            setFormData(prev => ({...prev, subDistrictName: ''}));
            setFormSubmitted(false);
            
            navigate(`/SubDisRegList?district=${encodeURIComponent(formData.district)}`);
          } else {
            alert(result.response?.data || "Error adding sub-district");
          }
        } else {
          alert("Authentication token missing. Please log in again.");
        }
      } catch (err) {
        console.error("Error adding sub-district:", err);
        alert("Error adding sub-district. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const handleDistrictSelect = (district) => {
    if (district === 'No results found') return;
    
    setFormData(prev => ({...prev, district: district}));
    
    updateUrlWithDistrict(district);
    
    setDropdownOpen(false);
    
    setErrors(prev => ({...prev, district: null}));
    setTouched(prev => ({...prev, district: true}));
  };

  const CustomSelect = ({ 
    label, 
    name, 
    value, 
    options, 
    onChange, 
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
                      key={index}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.district === district ? 'bg-blue-200' : ''}`}
                      onClick={() => handleDistrictSelect(district)}
                    >
                      {district}
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
          <div className="flex-1 p-2 sm:p-4 bg-gray-300">
            <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto relative">
              <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add Sub District</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                  <CustomSelect
                    label="District"
                    name="district"
                    value={formData.district}
                    options={availableDistricts}
                    error={touched.district && errors.district}
                    placeholder="Select District"
                  />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub District</label>
                    <div className="w-full sm:w-2/3">
                      <input
                        type="text"
                        name="subDistrictName"
                        placeholder="Enter Sub District"
                        value={formData.subDistrictName || ''}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${touched.subDistrictName && errors.subDistrictName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
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

export default AddSubdis