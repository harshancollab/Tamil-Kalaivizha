import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Dash from '../components/Dash'
// import { updateStageItemwiseAPI, addStageItemwiseAPI } from '../services/allAPI';

const DEditstgAllotitmwise = () => {
  const { id } = useParams();
  
  // Mock database of item codes - similar to the one in DAddStagedurat
  const itemDatabase = {
    '101': { name: 'Essay Writing', participants: '3', approxTime: '120 min' },
    '202': { name: 'Research Paper', participants: '1', approxTime: '180 min' },
    '304': { name: 'Story Writing', participants: '2', approxTime: '90 min' },
    '405': { name: 'Technical Report', participants: '4', approxTime: '150 min' },
    '506': { name: 'Presentation', participants: '5', approxTime: '60 min' }
  };
  
  const [formData, setFormData] = useState({
    itemName: "",
    itemCode: "",
    numberOfParticipants: "",
    stage: "",
    time: "",
    numberOfJudges: "",
    approxTimeTaken: "",
    date: "",
    numberOfClusters: ""
  });

  const [errors, setErrors] = useState({
    itemName: "",
    itemCode: "",
    numberOfParticipants: "",
    stage: "",
    time: "",
    numberOfJudges: "",
    approxTimeTaken: "",
    date: "",
    numberOfClusters: ""
  });

  const [touched, setTouched] = useState({
    itemName: false,
    itemCode: false,
    numberOfParticipants: false,
    stage: false,
    time: false,
    numberOfJudges: false,
    approxTimeTaken: false,
    date: false,
    numberOfClusters: false
  });

  console.log(formData);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (token && id) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await (id, reqHeader);
          if (result.status === 200) {
            setFormData(result.data);
          }
        } catch (err) {
          console.log(err);
          alert("Failed to fetch item details");
        }
      }
    };
    
    fetchItemDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for itemCode
    if (name === 'itemCode') {
      const itemData = itemDatabase[value] || { name: '', participants: '', approxTime: '' };
      
      setFormData({
        ...formData,
        [name]: value,
        itemName: itemData.name,
        numberOfParticipants: itemData.participants,
        approxTimeTaken: itemData.approxTime
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
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
      case "itemName":
        if (!value) errorMessage = "Item name is required";
        break;
      case "itemCode":
        if (!value) errorMessage = "Item code is required";
        break;
      case "numberOfParticipants":
        if (!value) errorMessage = "Number of participants is required";
        else if (value <= 0) errorMessage = "Number must be greater than 0";
        break;
      case "stage":
        if (!value) errorMessage = "Stage is required";
        break;
      case "time":
        if (!value) errorMessage = "Time is required";
        break;
      case "numberOfJudges":
        if (!value) errorMessage = "Number of judges is required";
        break;
      case "approxTimeTaken":
        if (!value) errorMessage = "Approximate time taken is required";
        break;
      case "date":
        if (!value) errorMessage = "Date is required";
        break;
      case "numberOfClusters":
        if (!value) errorMessage = "Number of clusters is required";
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
    const fieldValidations = {
      itemName: validateField("itemName", formData.itemName),
      itemCode: validateField("itemCode", formData.itemCode),
      numberOfParticipants: validateField("numberOfParticipants", formData.numberOfParticipants),
      stage: validateField("stage", formData.stage),
      time: validateField("time", formData.time),
      numberOfJudges: validateField("numberOfJudges", formData.numberOfJudges),
      approxTimeTaken: validateField("approxTimeTaken", formData.approxTimeTaken),
      date: validateField("date", formData.date),
      numberOfClusters: validateField("numberOfClusters", formData.numberOfClusters)
    };


    setTouched({
      itemName: true,
      itemCode: true,
      numberOfParticipants: true,
      stage: true,
      time: true,
      numberOfJudges: true,
      approxTimeTaken: true,
      date: true,
      numberOfClusters: true
    });

    return Object.values(fieldValidations).every(Boolean);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        
        try {
          const result = await (id, formData, reqHeader);
          if (result.status === 200) {
            alert("Updated successfully!");
          }
        } catch (err) {
          console.log(err);
          alert("Update failed. Please try again.");
        }
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  const handleCancel = () => {
    // Navigate back or reset form
    window.history.back();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Dash />
        <div className="flex-1 p-4 md:p-6 mt-4 w-full overflow-x-auto">
          <form
            className="bg-white p-3 md:p-4 rounded-lg shadow-md w-full min-h-screen"
            onSubmit={handleUpdate}
          >
            <div className="mb-4 mt-2 md:mb-5 md:mt-3">
              <h2 className="text-xl md:text-2xl font-semibold">Update Stage Allotment Item Wise</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 text-[#003566] p-2 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Item Code</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleChange}
                    onBlur={() => handleBlur("itemCode")}
                    className={`border px-2 py-1 rounded-full w-full text-sm md:text-base ${
                      touched.itemCode && errors.itemCode
                        ? "border-red-500 focus:outline-red-500"
                        : "border-blue-500 focus:outline-blue-500"
                    }`}
                    required
                  />
                  {touched.itemCode && errors.itemCode && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">{errors.itemCode}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Item Name</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    readOnly
                    className="px-2 py-1 rounded-full w-full text-sm md:text-base bg-gray-200"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Participants</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="numberOfParticipants"
                    value={formData.numberOfParticipants}
                    onChange={handleChange}
                    readOnly
                    className="px-2 py-1 rounded-full w-full text-sm md:text-base bg-gray-200"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Appr Time Taken</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="approxTimeTaken"
                    value={formData.approxTimeTaken}
                    onChange={handleChange}
                    readOnly
                    className="px-2 py-1 rounded-full w-full text-sm md:text-base bg-gray-200"
                    placeholder="e.g. 30 minutes"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Stage</label>
                <div className="w-full">
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    onBlur={() => handleBlur("stage")}
                    className={`border px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base ${
                      touched.stage && errors.stage
                        ? "border-red-500 focus:outline-red-500"
                        : "border-blue-500 focus:outline-blue-500"
                    }`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Stage 1">Stage 1</option>
                    <option value="Stage 2">Stage 2</option>
                    <option value="Stage 3">Stage 3</option>
                  </select>
                  {touched.stage && errors.stage && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">{errors.stage}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Date</label>
                <div className="w-full">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={() => handleBlur("date")}
                    className={`border px-2 py-1 rounded-full w-full text-sm md:text-base ${
                      touched.date && errors.date
                        ? "border-red-500 focus:outline-red-500"
                        : "border-blue-500 focus:outline-blue-500"
                    }`}
                    required
                  />
                  {touched.date && errors.date && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">{errors.date}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Time</label>
                <div className="w-full">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    onBlur={() => handleBlur("time")}
                    className={`border px-2 py-1 rounded-full w-full text-sm md:text-base ${
                      touched.time && errors.time
                        ? "border-red-500 focus:outline-red-500"
                        : "border-blue-500 focus:outline-blue-500"
                    }`}
                    required
                  />
                  {touched.time && errors.time && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">No of Clusters</label>
                <div className="w-full">
                  <select
                    name="numberOfClusters"
                    value={formData.numberOfClusters}
                    onChange={handleChange}
                    onBlur={() => handleBlur("numberOfClusters")}
                    className={`border px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base ${
                      touched.numberOfClusters && errors.numberOfClusters
                        ? "border-red-500 focus:outline-red-500"
                        : "border-blue-500 focus:outline-blue-500"
                    }`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {touched.numberOfClusters && errors.numberOfClusters && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">{errors.numberOfClusters}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Judges</label>
                <div className="w-full">
                  <select
                    name="numberOfJudges"
                    value={formData.numberOfJudges}
                    onChange={handleChange}
                    onBlur={() => handleBlur("numberOfJudges")}
                    className={`border px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base ${
                      touched.numberOfJudges && errors.numberOfJudges
                        ? "border-red-500 focus:outline-red-500"
                        : "border-blue-500 focus:outline-blue-500"
                    }`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {touched.numberOfJudges && errors.numberOfJudges && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">{errors.numberOfJudges}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-10 lg:mt-32 text-right px-2 md:px-4 md:mr-8">
              <button
                type="button"
                onClick={handleCancel}
                className="border mr-2 md:mr-20 border-blue-600 rounded-full px-4 md:px-6 lg:px-10 text-blue-700 py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-4 md:px-6 lg:px-10 text-white py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};




export default DEditstgAllotitmwise