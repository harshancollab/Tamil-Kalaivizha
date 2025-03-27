import React, { useState, useRef } from 'react';
import Dash from '../components/Dash';
import Header from '../components/Header';

const EditKalsvmDetails = () => {
 
  const [formData, setFormData] = useState({
    logo: '',
    kalolsavamYear: '',
    venue: 'SGHSS KATTAPPANA',
    startDate: '',
    endDate: ''
  });

 
  const fileInputRef = useRef(null);

  // Handler to update form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler for logo upload
  const handleLogoUpload = () => {
    // Trigger the file input click
    fileInputRef.current.click();
  };

  // Handler for file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      
      setFormData(prevState => ({
        ...prevState,
        logo: imageUrl
      }));
    }
  };

  // Handler for form submission
  const handleUpdate = () => {
    // Implement update logic
    console.log('Form data:', formData);
    // Here you would typically send the data to a backend API
  };

  
  const handleCancel = () => {
    // Reset form to initial state
    setFormData({
      logo: '',
      kalolsavamYear: '',
      venue: 'SGHSS KATTAPPANA',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex">
          {/* Sidebar */}
          <Dash />
          {/* Main Content */}
          <div className="flex-1 ml-6 p-8">
            <h2 className="text-xl font-bold mb-6">Kalolsavam Details</h2>

            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileSelect}
            />

            <div className="ml-16 mt-10">
              <div className="flex items-center mb-4">
                <h4 className="w-40 font-semibold">Kalolsavam Logo</h4>
                <div className="ml-4 flex items-center justify-between w-full">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mt-1 ml-20">
                    {formData.logo ? (
                      <img 
                        src={formData.logo} 
                        alt="Uploaded Logo" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400">No Logo</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleLogoUpload}
                    className="bg-blue-500 mr-[22rem] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline text-sm"
                  >
                    Upload Logo
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mb-6 mt-6">
                <h4 className="w-40 font-semibold">Kalolsavam Name</h4>
                <input
                  readOnly
                  type="text"
                  name="kalolsavamName"
                  className="ml-20 border border-blue-600 px-6 py-1 rounded-full w-full md:w-[30rem] bg-gray-100"
                  value="Idukki District Kalolsavam"
                />
              </div>

              <div className="flex items-center mb-6">
                <h4 className="w-40 font-semibold">Kalolsavam year</h4>
                <input
                  type="text"
                  name="kalolsavamYear"
                  className="ml-20 border border-blue-600 rounded-full px-6 py-1 w-full md:w-[30rem]"
                  value={formData.kalolsavamYear}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center mb-6">
                <h4 className="w-40 font-semibold">Venue</h4>
                <input
                  type="text"
                  name="venue"
                  className="ml-20 border border-blue-600 rounded-full px-6 py-1  w-full md:w-[30rem]"
                  value={formData.venue}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center mb-6">
                <h4 className="w-40 font-semibold">Start Date</h4>
                <div className="ml-20 relative">
                  <input
                    type="date"
                    name="startDate"
                    className="border border-blue-600 rounded-full px-6 py-1 w-full md:w-[30rem] pr-10"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <h4 className="w-40 font-semibold">End Date</h4>
                <div className="ml-20 relative">
                  <input
                    type="date"
                    name="endDate"
                    className="border border-blue-600 rounded-full px-6 py-1 w-full md:w-[30rem] pr-10"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-center mr-12 mt-32 space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-white hover:bg-gray-100 border border-blue-600 text-gray-700 font-bold py-3 px-14 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-14 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditKalsvmDetails;