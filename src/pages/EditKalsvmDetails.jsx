import React, { useState, useRef, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Dash from '../components/Dash'
import Header from '../components/Header'
import { editKalolsavamAPI } from '../services/allAPI'

const EditKalsvmDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    logo: '',
    kalolsavamYear: '',
    kalolsavamName: 'Idukki District Kalolsavam',
    venue: 'SGHSS KATTAPPANA',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.kalolsavam) {
      const kalolsavam = location.state.kalolsavam;
      setFormData({
        logo: kalolsavam.logo || '',
        kalolsavamYear: kalolsavam.year || '',
        kalolsavamName: kalolsavam.kalolsavamName || 'Idukki District Kalolsavam',
        venue: kalolsavam.venue || 'SGHSS KATTAPPANA',
        startDate: kalolsavam.startDate || '',
        endDate: kalolsavam.endDate || ''
      });
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};

    // Validate Kalolsavam Year
    if (!formData.kalolsavamYear.trim()) {
      newErrors.kalolsavamYear = 'Kalolsavam Year is required';
    } else if (!/^\d{4}$/.test(formData.kalolsavamYear)) {
      newErrors.kalolsavamYear = 'Kalolsavam Year must be a 4-digit year';
    }

    // Validate Venue
    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
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
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear the specific error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
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
      
      // Clear logo error
      setErrors(prevErrors => ({
        ...prevErrors,
        logo: undefined
      }));
    }
  };

  const handleUpdate = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem("token");
      
      if (!token) {
        setError("Authentication token not found");
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

      const logoInput = fileInputRef.current;
      if (logoInput.files.length > 0) {
        formDataToSubmit.append('logo', logoInput.files[0]);
      }

      const result = await editKalolsavamAPI(id, formDataToSubmit, reqHeader);
      
      if (result.status === 200) {
        navigate('/allkalolsavam');
      } else {
        setError("Failed to update Kalolsavam details");
      }
    } catch (err) {
      console.error("Error updating Kalolsavam details:", err);
      setError(err.response?.data?.message || "An error occurred while updating Kalolsavam details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/allkalolsavam');
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex flex-col sm:flex-row">
          <Dash />
          <div className="flex-1 sm:ml-6 p-4 sm:p-8 w-full md:w-full">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {error}
              </div>
            )}
            <h2 className="text-xl font-bold mb-6">Kalolsavam Details</h2>
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />

            <div className="sm:ml-16 mt-10 md:ml-8">
              <div className="flex flex-col sm:flex-row items-center mb-6">
                <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0 sm:mr-10">Kalolsavam Logo</h4>
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                  <div className="w-24 mr-40 ml-10 h-24 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center relative">
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
                            setErrors(prev => ({...prev, logo: 'Logo is required'}));
                          }}
                          className="absolute ml-8 -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
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
                    className="bg-blue-900 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline text-sm"
                  >
                    Upload Logo
                  </button>
                </div>
              </div>
              {errors.logo && (
                <div className="text-red-500 text-sm ml-48 mb-4">{errors.logo}</div>
              )}
              
              <div className="space-y-6 mr-1 md:mr-32">
                <div className="flex flex-col sm:flex-row items-center">
                  <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0 sm:mr-10">Kalolsavam Name</h4>
                  <input
                    readOnly
                    type="text"
                    name="kalolsavamName"
                    className="w-full ml-8 sm:w-[30rem] border border-blue-600 px-6 py-1 rounded-full bg-gray-100"
                    value={formData.kalolsavamName}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center">
                  <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0 sm:mr-10">Kalolsavam year</h4>
                  <div className="w-full ml-8 sm:w-[30rem]">
                    <input
                      type="text"
                      name="kalolsavamYear"
                      className={`w-full border ${errors.kalolsavamYear ? 'border-red-500' : 'border-blue-600'} rounded-full px-6 py-1`}
                      value={formData.kalolsavamYear}
                      onChange={handleInputChange}
                    />
                    {errors.kalolsavamYear && (
                      <div className="text-red-500 text-sm mt-1">{errors.kalolsavamYear}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center">
                  <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0 sm:mr-10">Venue</h4>
                  <div className="w-full ml-8 sm:w-[30rem]">
                    <input
                      type="text"
                      name="venue"
                      className={`w-full border ${errors.venue ? 'border-red-500' : 'border-blue-600'} rounded-full px-6 py-1`}
                      value={formData.venue}
                      onChange={handleInputChange}
                    />
                    {errors.venue && (
                      <div className="text-red-500 text-sm mt-1">{errors.venue}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center">
                  <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0 sm:mr-10">Start Date</h4>
                  <div className="w-full ml-8 sm:w-[30rem]">
                    <input
                      type="date"
                      name="startDate"
                      className={`w-full border ${errors.startDate ? 'border-red-500' : 'border-blue-600'} rounded-full px-6 py-1`}
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                    {errors.startDate && (
                      <div className="text-red-500 text-sm mt-1">{errors.startDate}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center">
                  <h4 className="w-full sm:w-40 font-semibold mb-3 sm:mb-0 sm:mr-10">End Date</h4>
                  <div className="w-full ml-8 sm:w-[30rem]">
                    <input
                      type="date"
                      name="endDate"
                      className={`w-full border ${errors.endDate ? 'border-red-500' : 'border-blue-600'} rounded-full px-6 py-1`}
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                    {errors.endDate && (
                      <div className="text-red-500 text-sm mt-1">{errors.endDate}</div>
                    )}
                  </div>
                </div>
              </div>
        
              <div className="flex flex-col sm:flex-row justify-center mt-32 space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-white border border-blue-500 text-blue-500 font-bold py-3 px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-3 px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto"
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditKalsvmDetails