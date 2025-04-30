
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { addStagefestAPI } from "../services/allAPI"

// Mock function to simulate fetching item details by code
// In a real application, you would replace this with an actual API call
const fetchItemDetailsByCode = async (code) => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data mapping - in a real app, this would come from your backend
      const itemDatabase = {
        "001": { name: "Solo Dance", participants: 1, approxTime: "5 minutes" },
        "002": { name: "Group Dance", participants: 8, approxTime: "12 minutes" },
        "03": { name: "Vocal Solo", participants: 1, approxTime: "4 minutes" },
        "004": { name: "Group Song", participants: 6, approxTime: "8 minutes" },
        "005": { name: "Skit", participants: 10, approxTime: "15 minutes" },
      };
      
      resolve(itemDatabase[code] || null);
    }, 300);
  });
};

const SAddStgAllotFest = () => {
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

  const [readOnlyFields, setReadOnlyFields] = useState({
    itemName: false,
    numberOfParticipants: false,
    approxTimeTaken: false
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

  const [isLoading, setIsLoading] = useState(false);

  // Effect to fetch item details when item code changes
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (formData.itemCode.trim()) {
        setIsLoading(true);
        try {
          const itemDetails = await fetchItemDetailsByCode(formData.itemCode);
          
          if (itemDetails) {
            // Update the form with fetched details
            setFormData(prev => ({
              ...prev,
              itemName: itemDetails.name,
              numberOfParticipants: itemDetails.participants,
              approxTimeTaken: itemDetails.approxTime // Added approx time
            }));
            
            // Make the fields read-only
            setReadOnlyFields({
              itemName: true,
              numberOfParticipants: true,
              approxTimeTaken: true
            });
            
            // Clear errors for these fields
            setErrors(prev => ({
              ...prev,
              itemName: "",
              numberOfParticipants: "",
              approxTimeTaken: ""
            }));
            
            // Mark fields as touched
            setTouched(prev => ({
              ...prev,
              itemName: true,
              numberOfParticipants: true,
              approxTimeTaken: true
            }));
          } else {
            // Reset if item code not found
            setReadOnlyFields({
              itemName: false,
              numberOfParticipants: false,
              approxTimeTaken: false
            });
          }
        } catch (error) {
          console.error("Error fetching item details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Reset if item code is empty - clear the three fields
        setFormData(prev => ({
          ...prev,
          itemName: "",
          numberOfParticipants: "",
          approxTimeTaken: ""
        }));
        
        // Reset read-only states
        setReadOnlyFields({
          itemName: false,
          numberOfParticipants: false,
          approxTimeTaken: false
        });
      }
    };

    fetchItemDetails();
  }, [formData.itemCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Only update if the field is not read-only or if it's the item code
    if (name === 'itemCode' || !readOnlyFields[name]) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
      
      validateField(name, value);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully", formData);

      const reqBody = new FormData();
      reqBody.append("itemName", formData.itemName);
      reqBody.append("itemCode", formData.itemCode);
      reqBody.append("numberOfParticipants", formData.numberOfParticipants);
      reqBody.append("stage", formData.stage);
      reqBody.append("time", formData.time);
      reqBody.append("numberOfJudges", formData.numberOfJudges);
      reqBody.append("approxTimeTaken", formData.approxTimeTaken);
      reqBody.append("date", formData.date);
      reqBody.append("numberOfClusters", formData.numberOfClusters);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        try {
          const result = await addStagefestAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert("Stage allocated successfully");

            // Reset form and read-only states
            setFormData({
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
            
            setReadOnlyFields({
              itemName: false,
              numberOfParticipants: false,
              approxTimeTaken: false
            });
            
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Authentication token missing. Please log in again.");
      }
    } else {
      console.log("Form has errors");
    }
  };

  const handleCancel = () => {
    setFormData({
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

    setTouched({
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

    setErrors({
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
    
    // Reset read-only states
    setReadOnlyFields({
      itemName: false,
      numberOfParticipants: false,
      approxTimeTaken: false
    });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Dash />
        <div className="flex-1 p-2 sm:p-4 md:p-6 mt-0 sm:mt-4 w-full">
          <form onSubmit={handleSubmit} className='min-h-screen w-full mx-auto p-3 sm:p-6 bg-white rounded-lg shadow-md'>
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <h2 className="text-lg sm:text-[20px] font-[600] leading-[100%] tracking-[2%]">
                Stage Allotment Festival Wise
              </h2>
            </div>

            <div className='w-full max-w-full mx-auto sm:ml-0 md:ml-4 lg:ml-16 xl:ml-48 mt-4 sm:mt-8 md:mt-16'>
              <div className="mt-4 md:mt-10 sm:ml-0 md:ml-4 lg:ml-12 items-center">
                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Code</label>
                  <div className="w-full sm:w-full md:w-80">
                    <input
                      type="text"
                      name="itemCode"
                      value={formData.itemCode}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("itemCode")}
                      className={`border px-2 py-1 rounded-full w-full mb-2 ${
                        touched.itemCode && errors.itemCode
                          ? "border-red-500 focus:outline-red-500"
                          : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    />
                    {isLoading && (
                      <p className="text-xs text-blue-500 mt-1">Loading item details...</p>
                    )}
                    {touched.itemCode && errors.itemCode && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.itemCode}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Name</label>
                  <div className="w-full sm:w-full md:w-80">
                    <input
                    readOnly
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("itemName")}
                      className={`border border-gray-200 px-2 py-1 rounded-full w-full mb-2 ${
                        touched.itemName && errors.itemName
                          ? "border-red-500 focus:outline-red-500"
                          : readOnlyFields.itemName 
                            ? "border-gray-600 focus:outline-gray-600 bg-gray-100"
                            : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    />
                  
                  </div>
                </div>

                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">No of Participants</label>
                  <div className="w-full sm:w-full md:w-80">
                    <input
                    readOnly
                      type="number"
                      name="numberOfParticipants"
                      value={formData.numberOfParticipants}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("numberOfParticipants")}
                      className={`border border-gray-200 px-2 py-1 rounded-full w-full mb-2 ${
                        touched.numberOfParticipants && errors.numberOfParticipants
                          ? "border-red-500 focus:outline-red-500"
                          : readOnlyFields.numberOfParticipants
                            ? "border-gray-600 focus:outline-gray-200 bg-gray-100"
                            : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    />
                   
                  </div>
                </div>
                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Appr Time Taken</label>
                  <div className="w-full sm:w-full md:w-80">
                    <input
                    readOnly
                      type="text"
                      name="approxTimeTaken"
                      value={formData.approxTimeTaken}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("approxTimeTaken")}
                      className={`border border-gray-200 px-2 py-1 rounded-full w-full mb-2 ${
                        touched.approxTimeTaken && errors.approxTimeTaken
                          ? "border-red-500 focus:outline-red-500"
                          : readOnlyFields.approxTimeTaken
                            ? "border-gray-600 focus:outline-gray-200 bg-gray-100"
                            : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                      placeholder="e.g. 30 minutes"
                    />
                    
                  </div>
                </div>

                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Stage</label>
                  <div className="w-full sm:w-full md:w-80">
                    <select
                      name="stage"
                      value={formData.stage}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("stage")}
                      className={`border px-2 py-1 rounded-full w-full mb-2 ${
                        touched.stage && errors.stage
                          ? "border-red-500 focus:outline-red-500"
                          : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Stage 1">Stage 1</option>
                      <option value="Stage 2">Stage 2</option>
                      <option value="Stage 3">Stage 3</option>
                    </select>
                    {touched.stage && errors.stage && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.stage}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Date</label>
                  <div className="w-full sm:w-full md:w-80">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("date")}
                      className={`border px-2 py-1 rounded-full w-full mb-2 ${
                        touched.date && errors.date
                          ? "border-red-500 focus:outline-red-500"
                          : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    />
                    {touched.date && errors.date && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.date}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Time</label>
                  <div className="w-full sm:w-full md:w-80">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("time")}
                      className={`border px-2 py-1 rounded-full w-full mb-2 ${
                        touched.time && errors.time
                          ? "border-red-500 focus:outline-red-500"
                          : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    />
                    {touched.time && errors.time && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>

            

               


                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">No of Clusters</label>
                  <div className="w-full sm:w-full md:w-80">
                    <select
                      name="numberOfClusters"
                      value={formData.numberOfClusters}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("numberOfClusters")}
                      className={`border px-2 py-1 rounded-full w-full mb-2 ${
                        touched.numberOfClusters && errors.numberOfClusters
                          ? "border-red-500 focus:outline-red-500"
                          : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    {touched.numberOfClusters && errors.numberOfClusters && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.numberOfClusters}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row mb-3 sm:mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">No of Judges</label>
                  <div className="w-full sm:w-full md:w-80">
                    <select
                      name="numberOfJudges"
                      value={formData.numberOfJudges}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("numberOfJudges")}
                      className={`border px-2 py-1 rounded-full w-full mb-2 ${
                        touched.numberOfJudges && errors.numberOfJudges
                          ? "border-red-500 focus:outline-red-500"
                          : "border-blue-600 focus:outline-blue-600"
                      }`}
                      required
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    {touched.numberOfJudges && errors.numberOfJudges && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.numberOfJudges}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className='text-center px-2 sm:mr-0 md:mr-16 lg:mr-72 mt-6 sm:mt-8 md:mt-12 max-w-full'>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-blue-500 mr-2 sm:mr-4 md:mr-12 border border-blue-600 px-4 sm:px-4 md:px-6 py-2 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-4 md:px-6 py-2 rounded-full"
                >
                  Add Stage
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SAddStgAllotFest;