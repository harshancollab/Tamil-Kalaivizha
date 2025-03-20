import React, { useState, useRef, useEffect } from "react"

const Editparticipat = ({ onClose }) => {
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

  const events = ["Event Name1", "Event Name2", "Event Name3", "Event Name4", "Event Name5"];
  const pinnary = ["Pinnary1", "Pinnary2", "Pinnary3"];

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0].name);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const selectItem = (setState, value) => {
    setState((prev) => (prev.includes(value) ? prev : [...prev, value]));
  };

  const removeItem = (setState, value) => {
    setState((prev) => prev.filter((item) => item !== value));
  };

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
        <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl min-h-[550px]">
          <button className="absolute top-3 right-3 text-red-600" onClick={onClose}>
            <i className="fas fa-times text-2xl"></i>
          </button>
          <h3 className="text-xl sm:text-2xl text-blue-900 font-bold mb-6 text-left">
            Update Participant
          </h3>
          <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center">
              <i className="fas fa-user text-gray-500 text-3xl"></i>
            </div>
            <button
              onClick={handleUploadClick}
              className="px-4 py-2 ml-24 bg-blue-900 text-white rounded-full shadow-md"
            >
              Update Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {selectedFile && (
            <p className="text-sm text-gray-600 mt-1 text-center">{selectedFile}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Reg No</label>
              <input type="text" className="w-full border-blue-900 px-4 py-2 border rounded-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Participant Name</label>
              <input type="text" className="w-full border-blue-900 px-4 py-2 border rounded-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Ad No</label>
              <input type="text" className="w-full border-blue-900 px-4 py-2 border rounded-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Class</label>
              <input type="text" className="w-full border-blue-900 px-4 py-2 border rounded-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Gender</label>
              <input type="text" className="w-full border-blue-900 px-4 py-2 border rounded-full" />
            </div>
            {/* item code */}
            <div className="relative" ref={eventDropdownRef}>
              <label className="block text-sm font-medium text-blue-900 mb-1">Item code</label>
              <div
                className="w-full h-10 border-blue-900 px-4 py-2 border rounded-full cursor-pointer flex items-center gap-2 overflow-hidden"
                onClick={() => setShowEventDropdown(!showEventDropdown)}
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
                            className="ml-2 text-white font-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(setSelectedEvents, event);
                            }}
                          >
                           <i class="fa-solid fa-xmark"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {showEventDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-blue-600 rounded-lg shadow-lg p-3">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Search Event..."
                    value={searchEvent}
                    onChange={(e) => setSearchEvent(e.target.value)}
                  />
                  {events
                    .filter((event) => event.toLowerCase().includes(searchEvent.toLowerCase()))
                    .map((event) => (
                      <p
                        key={event}
                        className="cursor-pointer p-1 hover:bg-blue-100"
                        onClick={() => selectItem(setSelectedEvents, event)}
                      >
                        {event}
                      </p>
                    ))}
                </div>
              )}
            </div>
            {/* pinnaryy */}
            <div className="relative" ref={pinnaryDropdownRef}>
              <label className="block text-sm font-medium text-blue-900 mb-1">Pinnary code</label>
              <div
                className="w-full border-blue-900 px-4 py-2 border rounded-full cursor-pointer flex flex-wrap items-center gap-2"
                onClick={() => setShowPinnaryDropdown(!showPinnaryDropdown)}
              >
                {selectedPinnary.length === 0 ? (
                  <span className="text-gray-400">Select Pinnary</span>
                ) : (
                  selectedPinnary.map((item, index) => (
                    <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center">
                      {item}
                      <button
                        className="ml-2 text-white font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(setSelectedPinnary, item);
                        }}
                      >
                       <i class="fa-solid fa-xmark"></i>
                      </button>
                    </span>
                  ))
                )}
              </div>
              {showPinnaryDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-blue-600 rounded-lg shadow-lg p-3">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Search Pinnary..."
                    value={searchPinnary}
                    onChange={(e) => setSearchPinnary(e.target.value)}
                  />
                  {pinnary
                    .filter((item) => item.toLowerCase().includes(searchPinnary.toLowerCase()))
                    .map((item) => (
                      <p
                        key={item}
                        className="cursor-pointer p-1 hover:bg-blue-100"
                        onClick={() => selectItem(setSelectedPinnary, item)}
                      >
                        {item}
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center sm:justify-end mt-6">
            <button className="w-full sm:w-40 px-6 py-3  bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white rounded-full shadow-lg">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editparticipat



