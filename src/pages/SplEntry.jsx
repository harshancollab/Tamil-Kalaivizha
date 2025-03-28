import React, { useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';

const SplEntry = () => {
  // State for form data
  const [formData, setFormData] = useState({
    schoolCode: '',
    schoolName: '',
    participants: [{ id: 1, value: '' }],
    gender: '',
    class: '',
    specialOrder: '',
    itemCode: '',
    captainAdno: '',
    isPrimary: false,
    remark: ''
  });

  // Function to handle input changes
  const handleInputChange = (e, field, index = null) => {
    const { name, value, type, checked } = e.target;

    if (index !== null) {
      // Handle participants array
      const newParticipants = [...formData.participants];
      newParticipants[index] = { 
        ...newParticipants[index], 
        value: value 
      };
      setFormData(prev => ({
        ...prev,
        participants: newParticipants
      }));
    } else {
      // Handle other inputs
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                field === 'remark' ? value.slice(0, 200) : 
                value
      }));
    }
  };

  // Function to add a new participant
  const addParticipant = () => {
    if (formData.participants.length < 5) { // Limit to 5 participants
      const newParticipantId = formData.participants.length > 0
        ? Math.max(...formData.participants.map(p => p.id)) + 1
        : 1;
      
      setFormData(prev => ({
        ...prev,
        participants: [
          ...prev.participants, 
          { id: newParticipantId, value: '' }
        ]
      }));
    }
  };

  // Function to remove a specific participant
  const removeParticipant = (idToRemove) => {
    if (formData.participants.length > 1) {
      setFormData(prev => ({
        ...prev,
        participants: prev.participants.filter(p => p.id !== idToRemove)
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    const requiredFields = [
      'schoolCode', 'schoolName', 'gender', 
      'class', 'specialOrder', 'itemCode'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    // Prepare data for submission
    const submissionData = {
      ...formData,
      participants: formData.participants.map(p => p.value)
    };

    console.log('Submitting form data:', submissionData);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen overflow-x-hidden">
        <Dash />
        <div className="ml-4 mt-3 w-full">
          <form 
            onSubmit={handleSubmit}
            className="min-h-screen mx-auto p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">Special Order Entry</h2>

            {/* School Code and Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              <div className="flex flex-col md:flex-row items-center">
                <label className="font-semibold text-blue-900 md:w-40">School Code</label>
                <input
                  type="text"
                  name="schoolCode"
                  value={formData.schoolCode}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label className="font-semibold text-blue-900 md:w-40">School Name</label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                  required
                />
              </div>
            </div>

            {/* Participants Section */}
            <h3 className="text-xl font-semibold text-gray-700 mt-6">Participants</h3>
            <div className="space-y-4 mt-2 ml-4">
              {formData.participants.map((participant, index) => (
                <div key={participant.id} className="flex flex-col md:flex-row items-center">
                  <label className="font-semibold text-blue-900 md:w-40">
                    {index === 0 ? 'Participants' : `Participants ${index + 1}`}
                  </label>
                  <div className="relative w-full md:w-80 flex items-center">
                    <select
                      value={participant.value}
                      onChange={(e) => handleInputChange(e, null, index)}
                      className="border border-blue-900 px-2 py-1 rounded-full w-full pr-8"
                      required
                    >
                      <option value="">Select Participant</option>
                      <option value="participant1">Participant 1</option>
                      <option value="participant2">Participant 2</option>
                      <option value="participant3">Participant 3</option>
                    </select>
                  </div>
                </div>
              ))}

              {/* Add and Delete Participant Buttons */}
              <div className="flex justify-center md:justify-start ml-40 mt-2 space-x-4">
                {/* Add Participant Button */}
                {formData.participants.length < 5 && (
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="px-4 py-1 bg-blue-900 text-white rounded-full"
                  >
                    Add
                  </button>
                )}

                {/* Delete Last Participant Button */}
                {formData.participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(formData.participants[formData.participants.length - 1].id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-full"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-4">
              {/* Class Field */}
              <div className="flex flex-col md:flex-row items-center">
                <label className="font-semibold text-blue-900 md:w-40">Class</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                  required
                />
              </div>

              {/* Gender Field */}
              <div className="flex flex-col md:flex-row items-center">
                <label className="font-semibold text-blue-900 md:w-40">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Boy</option>
                  <option value="female">Girl</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

          
            
            {/* Special Order and Captain Adno Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-4">
              {/* Special Order */}
              <div className="flex flex-col md:flex-row items-center">
                <label className="font-semibold text-blue-900 md:w-40">Special Order</label>
                <select
                  name="specialOrder"
                  value={formData.specialOrder}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                  required
                >
                  <option value="">Select Special Order</option>
                  <option value="order1">Special Order 1</option>
                  <option value="order2">Special Order 2</option>
                  <option value="order3">Special Order 3</option>
                </select>
              </div>

              {/* Captain Adno */}
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row items-center">
                  <label className="font-semibold text-blue-900 md:w-40">Captain Adno</label>
                  <input
                    type="text"
                    name="captainAdno"
                    value={formData.captainAdno}
                    onChange={(e) => handleInputChange(e)}
                    className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                  />
                </div>

                {/* Is Primary Checkbox */}
                <div className="flex justify-center md:ml-72 mt-2">
                  <input 
                    type="checkbox"
                    id="isPrimary"
                    name="isPrimary"
                    checked={formData.isPrimary}
                    onChange={(e) => handleInputChange(e)}
                    className="mr-2"
                  />
                  <label htmlFor="isPrimary" className="font-semibold text-blue-900">
                    Is Primary
                  </label>
                </div>
              </div>
            </div>

            {/* Item Code */}
            <div className="flex flex-col md:flex-row items-center mt-4 ml-4">
              <label className="font-semibold text-blue-900 md:w-40">Item Code</label>
              <input
                type="text"
                name="itemCode"
                value={formData.itemCode}
                onChange={(e) => handleInputChange(e)}
                className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                required
              />
            </div>

            {/* Remark */}
            <div className="flex flex-col md:flex-row items-center mt-10 ml-4">
              <label className="font-semibold text-blue-900 md:w-40">Remark</label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={(e) => handleInputChange(e, 'remark')}
                className="border border-blue-900 h-32 px-4 py-2 rounded-3xl w-full"
                maxLength={200}
                placeholder="Enter your remarks here (max 200 characters)"
              />
            </div>
            <div className="text-right text-gray-500 text-sm mt-1">
              {formData.remark.length}/200
            </div>

            {/* Save Button */}
            <div className='mt-16 text-right md:mr-20'>
              <button 
                type="submit"
                className='bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-6 md:px-10 text-white py-2'
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

export default SplEntry;