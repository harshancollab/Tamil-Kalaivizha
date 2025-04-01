import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { addSpecialOrderAPI } from '../services/allAPI'

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
    remark: '',
    // New fields for manual participant entry
    showManualEntry: false,
    participantName: '',
    participantClass: '',
    participantAdmNo: ''
  });

  // State for validation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

      // Validate participants field
      validateField('participants', newParticipants.map(p => p.value));
    } else if (name === 'showManualEntry') {
      // Handle the "Add" checkbox specifically
      setFormData(prev => ({
        ...prev,
        showManualEntry: checked
      }));
    } else {
      // Handle other inputs
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked :
          field === 'remark' ? value.slice(0, 200) :
            value
      }));

      // Validate the field
      validateField(name, type === 'checkbox' ? checked : value);
    }
  };

  // Function to handle field blur (for validation)
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });

    // Validate on blur
    validateField(field, field === 'participants' ?
      formData.participants.map(p => p.value) : formData[field]);
  };

  // Validation function for each field
  const validateField = (field, value) => {
    let errorMessage = "";

    switch (field) {
      case 'schoolCode':
        if (!value) errorMessage = "School code is required";
        break;
      case 'schoolName':
        if (!value) errorMessage = "School name is required";
        break;
      case 'participants':
        // Skip participant validation if manual entry is enabled
        if (!formData.showManualEntry) {
          // Check if at least one participant is selected
          if (!value || value.filter(p => p).length === 0) {
            errorMessage = "At least one participant must be selected";
          }
        }
        break;
      case 'participantName':
        if (formData.showManualEntry && !value) errorMessage = "Participant name is required";
        break;
      case 'participantClass':
        if (formData.showManualEntry && !value) errorMessage = "Participant class is required";
        break;
      case 'participantAdmNo':
        if (formData.showManualEntry && !value) errorMessage = "Admission number is required";
        break;
      case 'gender':
        if (!value) errorMessage = "Gender is required";
        break;
      case 'class':
        if (!value) errorMessage = "Class is required";
        break;
      case 'specialOrder':
        if (!value) errorMessage = "Special order is required";
        break;
      case 'itemCode':
        if (!value) errorMessage = "Item code is required";
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));

    return errorMessage === "";
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
      const updatedParticipants = formData.participants.filter(p => p.id !== idToRemove);
      setFormData(prev => ({
        ...prev,
        participants: updatedParticipants
      }));

      // Validate participants field after removal
      validateField('participants', updatedParticipants.map(p => p.value));
    }
  };

  // Validate the entire form
  const validateForm = () => {
    const requiredFields = [
      'schoolCode', 'schoolName', 'gender',
      'class', 'specialOrder', 'itemCode'
    ];
    
    // Add manual entry fields to required validation if the checkbox is checked
    if (formData.showManualEntry) {
      requiredFields.push('participantName', 'participantClass', 'participantAdmNo');
    } else {
      requiredFields.push('participants');
    }

    // Mark all fields as touched for validation
    const newTouched = {};
    requiredFields.forEach(field => {
      newTouched[field] = true;
    });

    setTouched(newTouched);

    // Validate all fields
    const fieldValidations = {};
    requiredFields.forEach(field => {
      if (field === 'participants') {
        fieldValidations[field] = validateField('participants', formData.participants.map(p => p.value));
      } else {
        fieldValidations[field] = validateField(field, formData[field]);
      }
    });

    return Object.values(fieldValidations).every(Boolean);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
      console.log("Form has errors, cannot submit");
      return;
    }

    // Prepare data for submission
    const submissionData = {
      schoolCode: formData.schoolCode,
      schoolName: formData.schoolName,
      gender: formData.gender,
      class: formData.class,
      specialOrder: formData.specialOrder,
      itemCode: formData.itemCode,
      captainAdno: formData.captainAdno,
      isPrimary: formData.isPrimary,
      remark: formData.remark
    };

    // Add participants data based on whether manual entry is enabled
    if (formData.showManualEntry) {
      submissionData.manualParticipant = {
        name: formData.participantName,
        class: formData.participantClass,
        admissionNo: formData.participantAdmNo
      };
    } else {
      submissionData.participants = formData.participants.map(p => p.value).filter(v => v); // Filter out empty values
    }

    console.log('Submitting form data:', submissionData);

    // Get authentication token
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await addSpecialOrderAPI(submissionData, reqHeader);
        if (result.status === 200) {
          alert("Special order added successfully");
          resetForm();
        } else {
          alert(result.response?.data || "Error adding special order");
        }
      } catch (err) {
        console.error("API Error:", err);
        alert("Error adding special order. Please try again.");
      }
    } else {
      alert("Authentication token missing. Please log in again.");
    }
  };

  const resetForm = () => {
    setFormData({
      schoolCode: '',
      schoolName: '',
      participants: [{ id: 1, value: '' }],
      gender: '',
      class: '',
      specialOrder: '',
      itemCode: '',
      captainAdno: '',
      isPrimary: false,
      remark: '',
      showManualEntry: false,
      participantName: '',
      participantClass: '',
      participantAdmNo: ''
    });
    setErrors({});
    setTouched({});
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
        <Dash />
        <div className="w-full px-2 md:px-4 py-3 md:ml-4 mt-3">
          <form
            onSubmit={handleSubmit}
            className="min-h-screen mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4">Special Order Entry</h2>

            {/* School Code and Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mx-2 md:ml-4">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">School Code</label>
                <div className="w-full md:w-80">
                  <input
                    type="text"
                    name="schoolCode"
                    value={formData.schoolCode}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={() => handleBlur('schoolCode')}
                    className={`border ${touched.schoolCode && errors.schoolCode ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    required
                  />
                  {touched.schoolCode && errors.schoolCode && (
                    <p className="text-sm text-red-500 mt-1">{errors.schoolCode}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">School Name</label>
                <div className="w-full md:w-80">
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={() => handleBlur('schoolName')}
                    className={`border ${touched.schoolName && errors.schoolName ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    required
                  />
                  {touched.schoolName && errors.schoolName && (
                    <p className="text-sm text-red-500 mt-1">{errors.schoolName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Participants and Gender Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 mx-2 md:ml-4">
              {/* Participants Section */}
              <div>
               <h3 className="text-lg md:text-xl font-semibold text-gray-700 ">Participants</h3>
                <div className="space-y-4 mt-2">
                  {!formData.showManualEntry && (
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                      <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Participant
                      </label>
                      <div className="relative w-full md:w-80 flex items-center">
                        <select
                          onChange={(e) => handleInputChange(e, null, 0)}
                          onBlur={() => handleBlur('participants')}
                          className={`border ${touched.participants && errors.participants ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                        >
                          <option value="">Select Participant</option>
                          <option value="participant1">Participant 1</option>
                          <option value="participant2">Participant 2</option>
                          <option value="participant3">Participant 3</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {!formData.showManualEntry && touched.participants && errors.participants && (
                    <p className="text-sm text-red-500 md:ml-40">{errors.participants}</p>
                  )}
                  
                  {/* Moved "Add" checkbox here under participants */}
                  <div className="flex justify-start md:justify-center md:ml-80 mt-2">
                    <input
                      type="checkbox"
                      id="showManualEntry"
                      name="showManualEntry"
                      checked={formData.showManualEntry}
                      onChange={(e) => handleInputChange(e)}
                      className="mr-2"
                    />
                    <label htmlFor="showManualEntry" className="font-semibold text-blue-900">
                      Add
                    </label>
                  </div>
                </div>
              </div>

              {/* Gender Field - Moved from below */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Gender</label>
                <div className="w-full md:w-80">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={() => handleBlur('gender')}
                    className={`border ${touched.gender && errors.gender ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {touched.gender && errors.gender && (
                    <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Manual Entry Fields - only show when checkbox is checked */}
            {formData.showManualEntry && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 mx-2 md:ml-4">
                {/* Participant Name */}
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Name</label>
                  <div className="w-full md:w-80">
                    <input
                      type="text"
                      name="participantName"
                      value={formData.participantName}
                      onChange={(e) => handleInputChange(e)}
                      onBlur={() => handleBlur('participantName')}
                      className={`border ${touched.participantName && errors.participantName ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    />
                    {touched.participantName && errors.participantName && (
                      <p className="text-sm text-red-500 mt-1">{errors.participantName}</p>
                    )}
                  </div>
                </div>

                {/* Participant Class */}
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Class</label>
                  <div className="w-full md:w-80">
                    <input
                      type="text"
                      name="participantClass"
                      value={formData.participantClass}
                      onChange={(e) => handleInputChange(e)}
                      onBlur={() => handleBlur('participantClass')}
                      className={`border ${touched.participantClass && errors.participantClass ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    />
                    {touched.participantClass && errors.participantClass && (
                      <p className="text-sm text-red-500 mt-1">{errors.participantClass}</p>
                    )}
                  </div>
                </div>

                {/* Admission Number */}
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Adm No</label>
                  <div className="w-full md:w-80">
                    <input
                      type="text"
                      name="participantAdmNo"
                      value={formData.participantAdmNo}
                      onChange={(e) => handleInputChange(e)}
                      onBlur={() => handleBlur('participantAdmNo')}
                      className={`border ${touched.participantAdmNo && errors.participantAdmNo ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    />
                    {touched.participantAdmNo && errors.participantAdmNo && (
                      <p className="text-sm text-red-500 mt-1">{errors.participantAdmNo}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Class and Special Order Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 mx-2 md:ml-4">
              {/* Special Order Field */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Special Order</label>
                <div className="w-full md:w-80">
                  <select
                    name="specialOrder"
                    value={formData.specialOrder}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={() => handleBlur('specialOrder')}
                    className={`border ${touched.specialOrder && errors.specialOrder ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    required
                  >
                    <option value="">Select Special Order</option>
                    <option value="order1">Special Order 1</option>
                    <option value="order2">Special Order 2</option>
                    <option value="order3">Special Order 3</option>
                  </select>
                  {touched.specialOrder && errors.specialOrder && (
                    <p className="text-sm text-red-500 mt-1">{errors.specialOrder}</p>
                  )}
                </div>
              </div>

              {/* Class Field */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Class</label>
                <div className="w-full md:w-80">
                  <select
                    name="class"
                    value={formData.class}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={() => handleBlur('class')}
                    className={`border ${touched.class && errors.class ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="class1">Class 1</option>
                    <option value="class2">Class 2</option>
                    <option value="class3">Class 3</option>
                  </select>
                  {touched.class && errors.class && (
                    <p className="text-sm text-red-500 mt-1">{errors.class}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Item Code and Captain Adno Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 mx-2 md:ml-4">
              {/* Item Code */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Code</label>
                <div className="w-full md:w-80">
                  <input
                    type="text"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={() => handleBlur('itemCode')}
                    className={`border ${touched.itemCode && errors.itemCode ? 'border-red-500' : 'border-blue-900'} px-2 py-1 rounded-full w-full`}
                    required
                  />
                  {touched.itemCode && errors.itemCode && (
                    <p className="text-sm text-red-500 mt-1">{errors.itemCode}</p>
                  )}
                </div>
              </div>

              {/* Captain Adno and Is Primary */}
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Captain Adno</label>
                  <input
                    type="text"
                    name="captainAdno"
                    value={formData.captainAdno}
                    onChange={(e) => handleInputChange(e)}
                    className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                  />
                </div>

                {/* Is Primary Checkbox */}
                <div className="flex justify-start md:justify-center md:ml-72 mt-2">
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

            {/* Remark */}
            <div className="flex flex-col md:flex-row items-start mt-6 md:mt-10 mx-2 md:ml-4">
              <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Remark</label>
              <div className="w-full">
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={(e) => handleInputChange(e, 'remark')}
                  className="border border-blue-900 h-24 md:h-32 px-4 py-2 rounded-3xl w-full"
                  maxLength={200}
                  placeholder="Enter your remarks here (max 200 characters)"
                />
                <div className="text-right text-gray-500 text-sm mt-1">
                  {formData.remark.length}/200
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className='mt-8 md:mt-16 text-right px-4 md:mr-20'>
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

export default SplEntry