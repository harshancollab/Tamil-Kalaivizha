import React, { useState, useRef, useEffect } from "react"
import { addparticipateAPI } from "../services/allAPI"

const AddParticipant = ({ onClose }) => {
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showPinnaryDropdown, setShowPinnaryDropdown] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedPinnary, setSelectedPinnary] = useState([]);
  const [searchEvent, setSearchEvent] = useState("");
  const [searchPinnary, setSearchPinnary] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const eventDropdownRef = useRef(null);
  const pinnaryDropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    regNo: "",
    participantName: "",
    adNo: "",
    classField: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    regNo: "",
    participantName: "",
    adNo: "",
    classField: "",
    gender: "",
    events: "",
    pinnary: "",
    image: "",
  });

  const [touched, setTouched] = useState({
    regNo: false,
    participantName: false,
    adNo: false,
    classField: false,
    gender: false,
    events: false,
    pinnary: false,
  });

  const events = ["Event 301", "Event 303", "Event 304", "Event 305", "Event 400"];
  const pinnary = ["Pinnary 299", "Pinnary 333", "Pinnary 88", "Pinnary 85", "Pinnary 80"];




  const filterPinnaryCodes = (searchTerm) => {
    return pinnary.filter(pin => {
      const code = pin.split(' ')[1];
      return code.includes(searchTerm);
    });
  };


  const filterEventCodes = (searchTerm) => {
    return events.filter(event => {


      const code = event.split(' ')[1];
      return code.includes(searchTerm);
    });
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      validateField("image", file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
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
    validateField(field, field === "events" ? selectedEvents : field === "pinnary" ? selectedPinnary : formData[field]);
  };

  const validateField = (field, value) => {
    let errorMessage = "";

    switch (field) {
      case "regNo":
        if (!value) errorMessage = "Registration number is required";
        else if (!/^[A-Za-z0-9]+$/.test(value)) errorMessage = "Registration number should be alphanumeric";
        break;
      case "participantName":
        if (!value) errorMessage = "Participant name is required";
        else if (value.length < 3) errorMessage = "Name should be at least 3 characters";
        break;
      case "adNo":
        if (!value) errorMessage = "Admission number is required";
        break;
      case "classField":
        if (!value) errorMessage = "Class is required";
        break;
      case "gender":
        if (!value) errorMessage = "Gender is required";
        break;
      case "events":
        if (!value || value.length === 0) errorMessage = "At least one event must be selected";
        break;
      case "image":
        if (value) {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          if (!allowedTypes.includes(value.type)) {
            errorMessage = "Please upload a valid image file (JPEG, PNG, GIF)";
          } else if (value.size > 5 * 1024 * 1024) {
            errorMessage = "Image size should be less than 5MB";
          }
        }
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

  const selectItem = (setState, value, field) => {
    const code = value.split(' ')[1];
    setState((prev) => {
      const newValue = prev.includes(code) ? prev : [...prev, code];
      validateField(field, newValue);
      return newValue;
    });
  };

  const removeItem = (setState, value, field) => {
    setState((prev) => {
      const newValue = prev.filter((item) => item !== value);
      validateField(field, newValue);
      return newValue;
    });
  };

  const validateForm = () => {
    const fieldValidations = {
      regNo: validateField("regNo", formData.regNo),
      participantName: validateField("participantName", formData.participantName),
      adNo: validateField("adNo", formData.adNo),
      classField: validateField("classField", formData.classField),
      gender: validateField("gender", formData.gender),
      events: validateField("events", selectedEvents),
      pinnary: validateField("pinnary", selectedPinnary),
    };

    setTouched({
      regNo: true,
      participantName: true,
      adNo: true,
      classField: true,
      gender: true,
      events: true,
      pinnary: true,
    });

    return Object.values(fieldValidations).every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    if (validateForm()) {
      console.log("Form submitted successfully", {
        ...formData,
        events: selectedEvents,
        pinnary: selectedPinnary,
        image: selectedFile,
      });

      const reqBody = new FormData();
      reqBody.append("regNo", formData.regNo);
      reqBody.append("participantName", formData.participantName);
      reqBody.append("adNo", formData.adNo);
      reqBody.append("classField", formData.classField);
      reqBody.append("gender", formData.gender);
      reqBody.append("events", JSON.stringify(selectedEvents));
      reqBody.append("pinnary", JSON.stringify(selectedPinnary));

      if (selectedFile) {
        reqBody.append("image", selectedFile);
      }

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };

        try {
          const result = await addparticipateAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert("Participant added successfully");
            onClose();
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.log(err);
          alert("Error adding participant. Please try again.");
        }
      } else {
        alert("Authentication token missing. Please log in again.");
      }
    } else {
      console.log("Form has errors");
    }
  };

  useEffect(() => {
    console.log("Current form data:", formData);
  }, [formData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        eventDropdownRef.current &&
        !eventDropdownRef.current.contains(event.target)
      ) {
        setShowEventDropdown(false);
      }
      if (
        pinnaryDropdownRef.current &&
        !pinnaryDropdownRef.current.contains(event.target)
      ) {
        setShowPinnaryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6 z-20 overflow-auto">
        <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
          <button className="absolute top-3 right-3 text-red-600 z-10" onClick={onClose}>
            <i className="fas fa-times text-2xl"></i>
          </button>
          <h3 className="text-xl sm:text-2xl text-blue-900 font-bold mb-6 text-left top-0 bg-white pt-2">
            Add Participant
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center">
                <i className="fas fa-user text-gray-500 text-3xl"></i>
              </div>
              <button
                type="button"
                onClick={handleUploadClick}
                className="px-4 py-2 ml-24 bg-blue-900 text-white rounded-full shadow-md"
              >
                Upload Photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            {selectedFile && (
              <p className="text-sm text-gray-600 mb-10">{selectedFile.name}</p>
            )}
            {errors.image && (
              <p className="text-sm text-red-500 mt-1 text-center">{errors.image}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Ad No</label>
                <input
                  type="text"
                  name="adNo"
                  value={formData.adNo}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("adNo")}
                  className={`w-full border px-4 py-2 rounded-full ${touched.adNo && errors.adNo
                    ? "border-red-500 focus:outline-red-500"
                    : "border-blue-900 focus:outline-blue-900"
                    }`}
                />
                {touched.adNo && errors.adNo && (
                  <p className="text-sm text-red-500 mt-1">{errors.adNo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Participant Name</label>
                <input
                  type="text"
                  name="participantName"
                  value={formData.participantName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("participantName")}
                  className={`w-full border px-4 py-2 rounded-full ${touched.participantName && errors.participantName
                    ? "border-red-500 focus:outline-red-500"
                    : "border-blue-900 focus:outline-blue-900"
                    }`}
                />
                {touched.participantName && errors.participantName && (
                  <p className="text-sm text-red-500 mt-1">{errors.participantName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Class</label>
                <input
                  type="text"
                  name="classField"
                  value={formData.classField}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("classField")}
                  className={`w-full border px-4 py-2 rounded-full ${touched.classField && errors.classField
                    ? "border-red-500 focus:outline-red-500"
                    : "border-blue-900 focus:outline-blue-900"
                    }`}
                />
                {touched.classField && errors.classField && (
                  <p className="text-sm text-red-500 mt-1">{errors.classField}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("gender")}
                  className={`w-full border px-4 py-2 rounded-full ${touched.gender && errors.gender
                    ? "border-red-500 focus:outline-red-500"
                    : "border-blue-900 focus:outline-blue-900"
                    }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>

                </select>
                {touched.gender && errors.gender && (
                  <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                )}
              </div>
              {/* Event Selection */}
              <div className="relative" ref={eventDropdownRef}>
                <label className="block text-sm font-medium text-blue-900 mb-1">Item code</label>
                <div
                  className={`w-full h-10 px-4 py-2 border rounded-full cursor-pointer flex items-center gap-2 overflow-hidden ${touched.events && errors.events
                    ? "border-red-500"
                    : "border-blue-900"
                    }`}
                  onClick={() => {
                    setShowEventDropdown(!showEventDropdown);
                    if (!touched.events) {
                      setTouched({ ...touched, events: true });
                      validateField("events", selectedEvents);
                    }
                  }}
                >
                  {selectedEvents.length === 0 ? (
                    <span className="text-gray-400 whitespace-nowrap">Select Events</span>
                  ) : (
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                      <div className="flex gap-1 overflow-auto max-w-[80%]">
                        {selectedEvents.map((event, index) => (
                          <span
                            key={index}
                            className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center text-sm"
                          >
                            {event}
                            <button
                              type="button"
                              className="ml-2 text-white font-bold"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeItem(setSelectedEvents, event, "events");
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {touched.events && errors.events && (
                  <p className="text-sm text-red-500 mt-1">{errors.events}</p>
                )}
                {showEventDropdown && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-blue-600 rounded-lg shadow-lg p-3 max-h-48 overflow-y-auto">
                    <input
                      type="text"
                      className="w-full p-2 border rounded sticky top-0 bg-white"
                      placeholder="Search Event "
                      value={searchEvent}
                      onChange={(e) => setSearchEvent(e.target.value)}
                    />
                    {filterEventCodes(searchEvent)
                      .map((event) => {
                        const code = event;
                        return (
                          <p
                            key={event}
                            className="cursor-pointer p-1 hover:bg-blue-100"
                            onClick={() => selectItem(setSelectedEvents, event, "events")}
                          >
                            {code}
                          </p>
                        );
                      })}
                  </div>
                )}
              </div>
              {/* Pinnary Selection */}
              <div className="relative" ref={pinnaryDropdownRef}>
                <label className="block text-sm font-medium text-blue-900 mb-1">Pinnary code</label>
                <div
                  className={`w-full h-10 px-4 py-2 border rounded-full cursor-pointer flex items-center gap-2 overflow-hidden ${touched.pinnary && errors.pinnary
                    ? "border-red-500"
                    : "border-blue-900"
                    }`}
                  onClick={() => {
                    setShowPinnaryDropdown(!showPinnaryDropdown);
                    if (!touched.pinnary) {
                      setTouched({ ...touched, pinnary: true });
                      validateField("pinnary", selectedPinnary);
                    }
                  }}
                >
                  {selectedPinnary.length === 0 ? (
                    <span className="text-gray-400 whitespace-nowrap">Select Pinnary</span>
                  ) : (
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                      <div className="flex gap-1 overflow-auto max-w-[80%]">
                        {selectedPinnary.map((pin, index) => (
                          <span
                            key={index}
                            className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center text-sm"
                          >
                            {pin}
                            <button
                              type="button"
                              className="ml-2 text-white font-bold"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeItem(setSelectedPinnary, pin, "pinnary");
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {touched.pinnary && errors.pinnary && (
                  <p className="text-sm text-red-500 mt-1">{errors.pinnary}</p>
                )}
                {showPinnaryDropdown && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-blue-600 rounded-lg shadow-lg p-3 max-h-48 overflow-y-auto">
                    <input
                      type="text"
                      className="w-full p-2 border rounded sticky top-0 bg-white"
                      placeholder="Search Pinnary"
                      value={searchPinnary}
                      onChange={(e) => setSearchPinnary(e.target.value)}
                    />
                    {filterPinnaryCodes(searchPinnary)
                      .map((pin) => {
                        const code = pin;
                        return (
                          <p
                            key={pin}
                            className="cursor-pointer p-1 hover:bg-blue-100"
                            onClick={() => selectItem(setSelectedPinnary, pin, "pinnary")}
                          >
                            {code}
                          </p>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center sm:justify-end mt-6 sticky bottom-0 bg-white py-4">
              <button
                type="submit"
                className="w-full sm:w-40 px-6 py-3 bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white rounded-full shadow-lg"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddParticipant