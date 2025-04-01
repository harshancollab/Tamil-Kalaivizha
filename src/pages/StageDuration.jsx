import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { addStageDurationAPI } from '../services/allAPI';

const StageDuration = () => {
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    participants: '',
    time: '',
    completionTime: '',
    stage: '',
    date: '',
    timeSecond: ''
  });

  const [errors, setErrors] = useState({
    itemCode: '',
    itemName: '',
    participants: '',
    time: '',
    completionTime: '',
    stage: '',
    date: '',
    timeSecond: ''
  });

  const [touched, setTouched] = useState({
    itemCode: false,
    itemName: false,
    participants: false,
    time: false,
    completionTime: false,
    stage: false,
    date: false,
    timeSecond: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let errorMessage = "";

    switch (field) {
      case "itemCode":
        if (!value) errorMessage = "Item code is required";
        else if (!/^[A-Za-z0-9]+$/.test(value)) errorMessage = "Item code should be alphanumeric";
        break;
      case "itemName":
        if (!value) errorMessage = "Item name is required";
        break;
      case "participants":
        if (!value) errorMessage = "Number of participants is required";
        else if (isNaN(value) || parseInt(value) <= 0) errorMessage = "Please enter a valid number";
        break;
      case "time":
        if (!value) errorMessage = "Time is required";
        break;
      case "completionTime":
        if (!value) errorMessage = "Completion time is required";
        break;
      case "stage":
        if (!value) errorMessage = "Stage is required";
        break;
      case "date":
        if (!value) errorMessage = "Date is required";
        break;
      case "timeSecond":
        if (!value) errorMessage = "Time is required";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));

    return errorMessage === "";
  };

  const validateForm = () => {
    const fields = Object.keys(formData);
    const fieldValidations = {};
    
    fields.forEach(field => {
      fieldValidations[field] = validateField(field, formData[field]);
    });

    
    const touchedFields = {};
    fields.forEach(field => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);

    return Object.values(fieldValidations).every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const token = sessionStorage.getItem("token");
      
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        try {
          const result = await addStageDurationAPI(formData, reqHeader);
          
          if (result.status === 200) {
            alert("Stage duration saved successfully");
        
            setFormData({
              itemCode: '',
              itemName: '',
              participants: '',
              time: '',
              completionTime: '',
              stage: '',
              date: '',
              timeSecond: ''
            });
          } else {
            alert(result.response?.data || "Error saving stage duration");
          }
        } catch (err) {
          console.log(err);
          alert("Error saving stage duration. Please try again.");
        }
      } else {
        alert("Authentication token missing. Please log in again.");
      }
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
        <Dash />
        <div className="w-full p-2 md:p-4 lg:p-6 ">
          <form 
            className="bg-white p-2 md:p-2 lg:p-6 rounded-lg shadow-md w-full min-h-screen"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl font-semibold">Stage Duration</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6 text-[#003566]">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Item Code</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("itemCode")}
                    className={`border ${touched.itemCode && errors.itemCode ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.itemCode && errors.itemCode && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.itemCode}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">Item Name</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("itemName")}
                    className={`border ${touched.itemName && errors.itemName ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.itemName && errors.itemName && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.itemName}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Participants</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="participants"
                    value={formData.participants}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("participants")}
                    className={`border ${touched.participants && errors.participants ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.participants && errors.participants && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.participants}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">Time</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("time")}
                    className={`border ${touched.time && errors.time ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.time && errors.time && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.time}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Completion Time</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="completionTime"
                    value={formData.completionTime}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("completionTime")}
                    className={`border ${touched.completionTime && errors.completionTime ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.completionTime && errors.completionTime && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.completionTime}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">Stage</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="stage"
                    value={formData.stage}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("stage")}
                    className={`border ${touched.stage && errors.stage ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.stage && errors.stage && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.stage}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Date</label>
                <div className="w-full">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("date")}
                    className={`border ${touched.date && errors.date ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.date && errors.date && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.date}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">Time</label>
                <div className="w-full">
                  <input
                    type="time"
                    name="timeSecond"
                    value={formData.timeSecond}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("timeSecond")}
                    className={`border ${touched.timeSecond && errors.timeSecond ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                  />
                  {touched.timeSecond && errors.timeSecond && (
                    <p className="text-sm text-red-500 mt-1 ml-2">{errors.timeSecond}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-16 text-right">
              <button 
                type="submit"
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-6 md:px-10 text-white py-2 hover:shadow-lg transition-shadow duration-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StageDuration;