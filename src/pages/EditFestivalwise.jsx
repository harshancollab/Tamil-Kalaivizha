import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
// import { updateStageItemwiseAPI, addStageItemwiseAPI } from '../services/allAPI';

const EditFestivalwise = () => {
  const { id } = useParams();
  
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
console.log(formData);

  // Fetch existing data when component mounts
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
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const { 
      itemName,
      itemCode,
      numberOfParticipants,
      stage,
      time,
      numberOfJudges,
      approxTimeTaken,
      date,
      numberOfClusters 
    } = formData;
    
    if (
      itemName &&
      itemCode &&
      numberOfParticipants &&
      stage &&
      time &&
      numberOfJudges &&
      approxTimeTaken &&
      date &&
      numberOfClusters
    ) {
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
      alert("Please fill the form completely!");
    }
  };

  const handleCancel = () => {
    // Navigate back or reset form
    window.history.back();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
        <Dash />
        <div className="w-full p-2 md:p-4">
          <form
            className="bg-white p-3 md:p-4 rounded-lg shadow-md w-full min-h-screen"
            onSubmit={handleUpdate}
          >
            <div className="mb-4 mt-2 md:mb-5 md:mt-3">
              <h2 className="text-xl md:text-2xl font-semibold">Update Stage Allotment Itemwise</h2>
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
                    className='border border-blue-500 px-2 py-1 rounded-full w-full text-sm md:text-base'
                    required
                  />
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
                    className='border border-blue-500 px-2 py-1 rounded-full w-full text-sm md:text-base'
                    required
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
                    className='border border-blue-500 px-2 py-1 rounded-full w-full text-sm md:text-base'
                    required
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
                    className='border border-blue-500 px-2 py-1 rounded-full w-full text-sm md:text-base'
                    required
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
                    className="border border-blue-500 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Stage 1">Stage 1</option>
                    <option value="Stage 2">Stage 2</option>
                    <option value="Stage 3">Stage 3</option>
                  </select>
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
                    className='border border-blue-500 px-2 py-1 rounded-full w-full text-sm md:text-base'
                    required
                  />
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
                    className='border border-blue-500 px-2 py-1 rounded-full w-full text-sm md:text-base'
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">No of Clusters</label>
                <div className="w-full">
                  <select
                    name="numberOfClusters"
                    value={formData.numberOfClusters}
                    onChange={handleChange}
                    className="border border-blue-500 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base"
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Judges</label>
                <div className="w-full">
                  <select
                    name="numberOfJudges"
                    value={formData.numberOfJudges}
                    onChange={handleChange}
                    className="border border-blue-500 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base"
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
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


export default EditFestivalwise