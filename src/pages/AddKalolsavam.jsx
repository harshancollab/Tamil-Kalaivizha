// It ADmin  Create Kalosvm EDit 
import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Dash from '../components/Dash'
import Header from '../components/Header'
import Alert from '../components/Alert'
// import { AddKalolsavamAPI } from '../services/allAPI';

const AddKalolsavam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [availableSubDistricts, setAvailableSubDistricts] = useState(['Select']);
  const [searchParams] = useSearchParams();
    // Alert state
      const [alert, setAlert] = useState({
          show: false,
          message: '',
          type: 'success'
      });
  

  const [formData, setFormData] = useState({
    logo: '',
    kalolsavamYear: '',
    kalolsavamName: '',
    venue: '',
    startDate: '',
    endDate: '',
    district: 'Select',
    subDistrict: 'Select'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const fileInputRef = useRef(null);
  
  // Track dropdown state
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [subDistrictDropdownOpen, setSubDistrictDropdownOpen] = useState(false);
  const [districtSearchTerm, setDistrictSearchTerm] = useState('');
  const [subDistrictSearchTerm, setSubDistrictSearchTerm] = useState('');
  
  // References for clicking outside
  const districtDropdownRef = useRef(null);
  const subDistrictDropdownRef = useRef(null);
  
  const districtToSubDistrict = {
    'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
    'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
    'Ernakulam': [],
    'Kozhikode': ['Vatakara'],
    'Wayanad': [],
    'Thrissur': []
  };
  
  const allSubDistricts = [
    'Select',
    'Munnar',
    'Adimali',
    'Kattappana',
    'Nedumkandam',
    'Devikulam',
    'Chittur',
    'Pattambi',
    'Kuzhalmannam',
    'Nemmara',
    'Mannarkkad',
    'Vatakara',
    'Ottapalam'
  ];

  const allDistricts = [
    'Select',
    'Idukki',
    'Ernakulam',
    'Palakkad',
    'Kozhikode',
    'Wayanad',
    'Thrissur',
    
  ];


  useEffect(() => {
    // Get district and subDistrict from URL parameters
    const urlDistrict = searchParams.get('district');
    const urlSubDistrict = searchParams.get('subDistrict');
    
    if (urlDistrict && urlDistrict !== 'Select') {
        setFormData(prev => ({
            ...prev,
            district: urlDistrict,
            // If urlSubDistrict exists and belongs to this district, use it
            subDistrict: urlSubDistrict && 
                         districtToSubDistrict[urlDistrict]?.includes(urlSubDistrict) 
                         ? urlSubDistrict : 'Select'
        }));
        
        // Update available sub-districts if district is selected
        if (urlDistrict !== 'Select') {
            const subDistricts = ['Select', ...(districtToSubDistrict[urlDistrict] || [])];
            setAvailableSubDistricts(subDistricts);
        }
    }
}, [searchParams]);
  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
        setDistrictDropdownOpen(false);
      }
      if (subDistrictDropdownRef.current && !subDistrictDropdownRef.current.contains(event.target)) {
        setSubDistrictDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // If we're editing, load the existing data
  useEffect(() => {
    if (location.state && location.state.kalolsavam) {
      const kalolsavam = location.state.kalolsavam;
      setFormData({
        logo: kalolsavam.logo || '',
        kalolsavamYear: kalolsavam.year || '',
        kalolsavamName: kalolsavam.kalolsavamName || 'Idukki District Kalolsavam',
        venue: kalolsavam.venue || 'SGHSS KATTAPPANA',
        startDate: kalolsavam.startDate || '',
        endDate: kalolsavam.endDate || '',
        district: kalolsavam.district || 'Select',
        subDistrict: kalolsavam.subDistrict || 'Select'
      });
    }
  }, [location.state]);

  // Filter districts based on search term
  const filteredDistricts = allDistricts.filter(district =>
    district.toLowerCase().includes(districtSearchTerm.toLowerCase())
  );

  // Filter subdistricts based on search term and selected district
  const filteredSubDistricts = formData.district !== 'Select'
    ? ['Select', ...(districtToSubDistrict[formData.district] || [])]
        .filter(subDistrict => 
          subDistrict.toLowerCase().includes(subDistrictSearchTerm.toLowerCase())
        )
    : ['Select'];

  const validateForm = () => {
    const newErrors = {};

    // Validate Kalolsavam Year
    if (!formData.kalolsavamYear.trim()) {
      newErrors.kalolsavamYear = 'Kalolsavam Year is required';
    } else if (!/^\d{4}$/.test(formData.kalolsavamYear)) {
      newErrors.kalolsavamYear = 'Kalolsavam Year must be a 4-digit year';
    }

    // Validate Kalolsavam Name
    if (!formData.kalolsavamName.trim()) {
      newErrors.kalolsavamName = 'Kalolsavam Name is required';
    }

    // Validate Venue
    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }

    // Validate District
    if (formData.district === 'Select') {
      newErrors.district = 'District is required';
    }

    // Validate Start Date
    if (!formData.startDate) {
      newErrors.startDate = 'Start Date is required';
    }

    // Validate End Date
    if (!formData.endDate) {
      newErrors.endDate = 'End Date is required';
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End Date must be after Start Date';
    }

    // Validate Logo
    if (!formData.logo) {
      newErrors.logo = 'Logo is required';
    }

    setErrors(newErrors);
    // Mark all fields as touched when validating the entire form
    setTouched({
      logo: true,
      kalolsavamYear: true,
      kalolsavamName: true,
      venue: true,
      startDate: true,
      endDate: true,
      district: true,
      subDistrict: true
    });
    
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate this specific field
    validateField(name, value);
  };
  
  const handleDistrictSelect = (district) => {
    setFormData(prevState => ({
      ...prevState,
      district: district,
      subDistrict: 'Select' // Reset subDistrict when district changes
    }));
    
    setTouched(prev => ({
      ...prev,
      district: true
    }));
    
    validateField('district', district);
    setDistrictDropdownOpen(false);
    setDistrictSearchTerm('');
  };
  
  const handleSubDistrictSelect = (subDistrict) => {
    setFormData(prevState => ({
      ...prevState,
      subDistrict: subDistrict
    }));
    
    setTouched(prev => ({
      ...prev,
      subDistrict: true
    }));
    
    setSubDistrictDropdownOpen(false);
    setSubDistrictSearchTerm('');
  };

  const validateField = (name, value) => {
    let fieldError = '';
    
    switch(name) {
      case 'kalolsavamYear':
        if (!value.trim()) {
          fieldError = 'Kalolsavam Year is required';
        } else if (!/^\d{4}$/.test(value)) {
          fieldError = 'Kalolsavam Year must be a 4-digit year';
        }
        break;
      case 'kalolsavamName':
        if (!value.trim()) {
          fieldError = 'Kalolsavam Name is required';
        }
        break;
      case 'venue':
        if (!value.trim()) {
          fieldError = 'Venue is required';
        }
        break;
      case 'district':
        if (value === 'Select') {
          fieldError = 'District is required';
        }
        break;
      case 'startDate':
        if (!value) {
          fieldError = 'Start Date is required';
        }
        break;
      case 'endDate':
        if (!value) {
          fieldError = 'End Date is required';
        } else if (new Date(value) < new Date(formData.startDate)) {
          fieldError = 'End Date must be after Start Date';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldError || undefined
    }));
  };

  const handleLogoUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          logo: 'Invalid file type. Please upload a JPG, PNG, or GIF image.'
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prevErrors => ({
          ...prevErrors,
          logo: 'File size exceeds 5MB limit.'
        }));
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      
      setFormData(prevState => ({
        ...prevState,
        logo: imageUrl
      }));
      
      // Mark logo as touched
      setTouched(prev => ({
        ...prev,
        logo: true
      }));
      
      // Clear logo error
      setErrors(prevErrors => ({
        ...prevErrors,
        logo: undefined
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  const handleAdd = async () => {
    // Validate form before submission
    if (!validateForm()) {
      // Scroll to the first error if any
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem("token");
      
      if (!token) {
        showAlert("Authentication token not found");
        navigate('/login');
        return;
      }

      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('kalolsavamYear', formData.kalolsavamYear);
      formDataToSubmit.append('kalolsavamName', formData.kalolsavamName);
      formDataToSubmit.append('venue', formData.venue);
      formDataToSubmit.append('startDate', formData.startDate);
      formDataToSubmit.append('endDate', formData.endDate);
      formDataToSubmit.append('district', formData.district);
      formDataToSubmit.append('subDistrict', formData.subDistrict);

      const logoInput = fileInputRef.current;
      if (logoInput.files.length > 0) {
        formDataToSubmit.append('logo', logoInput.files[0]);
      }

      // Uncomment this when API is ready
      const result = await AddKalolsavamAPI(formDataToSubmit, reqHeader);
      
      // If API call is successful, navigate to the list page
      if (result.status === 201) {
        showAlert(` added successfully!`, 'success');
        navigate('/allkalolsavam');
      } else {
        setError("Failed to add Kalolsavam details");
      }
      
      // For testing purposes:
      // console.log("Form data submitted:", formData);
      // setTimeout(() => {
      //   setLoading(false);
      //   navigate('/allkalolsavam');
      // }, 1000);
      
    } catch (err) {
      console.error("Error adding Kalolsavam details:", err);
      showAlert(err.response?.data?.message || "An error occurred while adding Kalolsavam details");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/CreateKalolsavam');
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
          <div className="flex-1 p-4 sm:p-6 md:p-8 w-full">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <span className="text-red-500">×</span>
                </button>
              </div>
            )}
            
            <h2 className="text-xl font-bold mb-6">Add Kalolsavam</h2>

            {/* Form content with improved responsive layout */}
            <div className="flex justify-center px-2 sm:px-4 lg:ml-32 mt-6 sm:mt-10">
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
    
                <div className="w-full max-w-4xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                    <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">Kalolsavam Logo</h4>
                    <div className="flex flex-col sm:flex-row items-center w-full">
                      <div className="w-24 h-24 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center relative mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0 sm:ml-0 md:ml-14">
                        {formData.logo ? (
                          <>
                            <img 
                              src={formData.logo} 
                              alt="Uploaded Logo" 
                              className="w-full h-full object-cover rounded-full"
                            />
                            <button 
                              onClick={() => {
                                setFormData(prev => ({...prev, logo: ''}));
                                setTouched(prev => ({...prev, logo: true}));
                                setErrors(prev => ({...prev, logo: 'Logo is required'}));
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              aria-label="Remove logo"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400">No Logo</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleLogoUpload}
                        className="bg-blue-900 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full focus:outline-none focus:shadow-outline text-sm hover:bg-blue-800 transition-colors duration-300 w-full sm:w-auto mt-2 sm:mt-0"
                      >
                        Upload Logo
                      </button>
                    </div>
                  </div>
                  {touched.logo && errors.logo && (
                    <div className="text-red-500 text-sm text-center sm:text-left sm:ml-40 mb-4">{errors.logo}</div>
                  )}
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">Kalolsavam Name</h4>
                      <div className="w-full sm:max-w-md">
                        <input
                          type="text"
                          name="kalolsavamName"
                          className={`w-full border ${touched.kalolsavamName && errors.kalolsavamName ? 'border-red-500' : 'border-blue-600'} px-4 py-2 rounded-full bg-gray-100 sm:ml-0 md:ml-10 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                          value={formData.kalolsavamName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter kalolsavam name"
                          aria-label="Kalolsavam Name"
                          aria-invalid={errors.kalolsavamName ? "true" : "false"}
                        />
                        {touched.kalolsavamName && errors.kalolsavamName && (
                          <div className="text-red-500 text-sm mt-1 ml-0 md:ml-10">{errors.kalolsavamName}</div>
                        )}
                      </div>
                    </div>
    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">Kalolsavam year</h4>
                      <div className="w-full sm:max-w-md">
                        <input
                          type="text"
                          name="kalolsavamYear"
                          className={`w-full border ${touched.kalolsavamYear && errors.kalolsavamYear ? 'border-red-500' : 'border-blue-600'} rounded-full px-4 py-2 sm:ml-0 md:ml-10 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                          value={formData.kalolsavamYear}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter 4-digit year"
                          aria-label="Kalolsavam Year"
                          aria-invalid={errors.kalolsavamYear ? "true" : "false"}
                        />
                        {touched.kalolsavamYear && errors.kalolsavamYear && (
                          <div className="text-red-500 text-sm mt-1 ml-0 md:ml-10">{errors.kalolsavamYear}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">Venue</h4>
                      <div className="w-full sm:max-w-md">
                        <input
                          type="text"
                          name="venue"
                          className={`w-full border ${touched.venue && errors.venue ? 'border-red-500' : 'border-blue-600'} rounded-full px-4 py-2 sm:ml-0 md:ml-10 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                          value={formData.venue}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter venue"
                          aria-label="Venue"
                          aria-invalid={errors.venue ? "true" : "false"}
                        />
                        {touched.venue && errors.venue && (
                          <div className="text-red-500 text-sm mt-1 ml-0 md:ml-10">{errors.venue}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">Start Date</h4>
                      <div className="w-full sm:max-w-md">
                        <input
                          type="date"
                          name="startDate"
                          className={`w-full border ${touched.startDate && errors.startDate ? 'border-red-500' : 'border-blue-600'} rounded-full px-4 py-2 sm:ml-0 md:ml-10 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                          value={formData.startDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          aria-label="Start Date"
                          aria-invalid={errors.startDate ? "true" : "false"}
                        />
                        {touched.startDate && errors.startDate && (
                          <div className="text-red-500 text-sm mt-1 ml-0 md:ml-10">{errors.startDate}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">End Date</h4>
                      <div className="w-full sm:max-w-md">
                        <input
                          type="date"
                          name="endDate"
                          className={`w-full border ${touched.endDate && errors.endDate ? 'border-red-500' : 'border-blue-600'} rounded-full px-4 py-2 sm:ml-0 md:ml-10 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                          value={formData.endDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          aria-label="End Date"
                          aria-invalid={errors.endDate ? "true" : "false"}
                          min={formData.startDate}
                        />
                        {touched.endDate && errors.endDate && (
                          <div className="text-red-500 text-sm mt-1 ml-0 md:ml-10">{errors.endDate}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">District</h4>
                      <div className="w-full sm:max-w-md relative" ref={districtDropdownRef}>
                        <div 
                          className={`w-full border ${touched.district && errors.district ? 'border-red-500' : 'border-blue-600'} rounded-full px-4 py-2 sm:ml-0 md:ml-10 bg-gray-100 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                          onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
                        >
                          <span className={formData.district === 'Select' ? 'text-gray-400' : ''}>{formData.district}</span>
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        {districtDropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg sm:ml-0 md:ml-10">
                            {allDistricts.length > 7 && (
                              <div className="p-2 border-b">
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                  placeholder="Search districts..."
                                  value={districtSearchTerm}
                                  onChange={(e) => setDistrictSearchTerm(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            )}
                            <div className="max-h-60 overflow-y-auto">
                              {filteredDistricts.map((district, index) => (
                                <div
                                  key={index}
                                  className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${formData.district === district ? 'bg-blue-100' : ''}`}
                                  onClick={() => handleDistrictSelect(district)}
                                >
                                  {district}
                                </div>
                              ))}
                              {filteredDistricts.length === 0 && (
                                <div className="px-4 py-2 text-gray-500">No matches found</div>
                              )}
                            </div>
                          </div>
                        )}
                        {touched.district && errors.district && (
                          <div className="text-red-500 text-sm mt-1 ml-0 md:ml-10">{errors.district}</div>
                        )}
                      </div>
                    </div>
                    
                    {/* Sub-District Selection */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0">Sub District</h4>
                      <div className="w-full sm:max-w-md relative" ref={subDistrictDropdownRef}>
                        <div 
                          className={`w-full border border-blue-600 rounded-full px-4 py-2 sm:ml-0 md:ml-10 bg-gray-100 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ${formData.district === 'Select' ? 'opacity-70' : ''}`}
                          onClick={() => formData.district !== 'Select' && setSubDistrictDropdownOpen(!subDistrictDropdownOpen)}
                        >
                          <span className={formData.subDistrict === 'Select' ? 'text-gray-400' : ''}>{formData.subDistrict}</span>
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        {subDistrictDropdownOpen && formData.district !== 'Select' && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg sm:ml-0 md:ml-10">
                            {filteredSubDistricts.length > 7 && (
                              <div className="p-2 border-b">
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                  placeholder="Search sub-districts..."
                                  value={subDistrictSearchTerm}
                                  onChange={(e) => setSubDistrictSearchTerm(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            )}
                            <div className="max-h-60 overflow-y-auto">
                              {filteredSubDistricts.map((subDistrict, index) => (
                                <div
                                  key={index}
                                  className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${formData.subDistrict === subDistrict ? 'bg-blue-100' : ''}`}
                                  onClick={() => handleSubDistrictSelect(subDistrict)}
                                >
                                  {subDistrict}
                                </div>
                              ))}
                              {filteredSubDistricts.length === 0 && (
                                <div className="px-4 py-2 text-gray-500">No matches found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
            
                  <div className="flex flex-col sm:flex-row justify-center mt-12 sm:mt-16 md:mt-24 space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-8 sm:py-3 sm:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAdd}
                      disabled={loading}
                      className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 sm:py-3 sm:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
                    >
                      {loading ? 'Adding...' : 'Add'}
                    </button>
                  </div>
                </div>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddKalolsavam;