import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Addparticipat from "../components/Addparticipat"
import Editparticipate from "../components/Editparticipate"
import Dash from "../components/Dash"
import { allparticipateAPI } from "../services/allAPI"

const ParticipateList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search") || "";
  const genderParam = queryParams.get("gender") || "";
  const showAddModal = queryParams.get("addModal") === "true";
  const editParticipantId = queryParams.get("editId");

  const [participants, setParticipants] = useState([
    { id: 1, regNo: 100, adNo: 1000, class: "Class 1", name: "Participant 1", gender: "Girl", eventCode: 100, additionalEventCodes: [200, 300], captain: "captain3" },
    { id: 2, regNo: 200, adNo: 2000, class: "Class 2", name: "Participant 2", gender: "Boy", eventCode: 200, additionalEventCodes: [100, 400], captain: "captain2" },
    { id: 3, regNo: 300, adNo: 3000, class: "Class 3", name: "Participant 3", gender: "Girl", eventCode: 300, additionalEventCodes: [500, 600], captain: "captain4" },
    { id: 4, regNo: 400, adNo: 4000, class: "Class 4", name: "Participant 4", gender: "Boy", eventCode: 400, additionalEventCodes: [200, 600], captain: "captain1" },
    { id: 5, regNo: 500, adNo: 5000, class: "Class 5", name: "Participant 5", gender: "Girl", eventCode: 500, additionalEventCodes: [300, 700], captain: "captain6" },
    { id: 6, regNo: 600, adNo: 6000, class: "Class 6", name: "Participant 6", gender: "Boy", eventCode: 600, additionalEventCodes: [400, 800], captain: "captain7" },
    { id: 7, regNo: 700, adNo: 7000, class: "Class 7", name: "Participant 7", gender: "Girl", eventCode: 700, additionalEventCodes: [500, 900], captain: "captain9" },
    { id: 8, regNo: 800, adNo: 8000, class: "Class 8", name: "Participant 8", gender: "Boy", eventCode: 800, additionalEventCodes: [600, 1000], captain: "captain8" },
    { id: 9, regNo: 900, adNo: 9000, class: "Class 9", name: "Participant 9", gender: "Girl", eventCode: 900, additionalEventCodes: [700, 100], captain: "captain0" },
    { id: 10, regNo: 1000, adNo: 10000, class: "Class 10", name: "Participant 10", gender: "Boy", eventCode: 1000, additionalEventCodes: [800, 200], captain: "captain" },
  ]);

  const [searchkey, setSearchkey] = useState(searchParam);
  const [genderFilter, setGenderFilter] = useState(genderParam);
  const [isAddModalOpen, setIsAddModalOpen] = useState(showAddModal);
  const [isEditModalOpen, setIsEditModalOpen] = useState(!!editParticipantId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [allParticipate, setAllParticipate] = useState([])
  const [expandedCaptain, setExpandedCaptain] = useState(null);
  const [hoveredEventCode, setHoveredEventCode] = useState(null);
  console.log(allParticipate);

  useEffect(() => {
    if (editParticipantId) {
      const participant = participants.find(p => p.id.toString() === editParticipantId);
      if (participant) {
        setSelectedParticipant(participant);
        setIsEditModalOpen(true);
      }
    } else {
      setIsEditModalOpen(false);
    }
  }, [editParticipantId, participants]);

  useEffect(() => {
    getAllParticipate()
  }, [])

  const getAllParticipate = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await allparticipateAPI(reqHeader)
        if (result.status == 200) {
          setAllParticipate(result.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchkey) params.append("search", searchkey);
    if (genderFilter) params.append("gender", genderFilter);
    if (isAddModalOpen) params.append("addModal", "true");

    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  }, [searchkey, genderFilter, isAddModalOpen, navigate, location.pathname]);

  useEffect(() => {
    const addModalParam = queryParams.get("addModal");
    setIsAddModalOpen(addModalParam === "true");
  }, [queryParams]);

  const filteredParticipants = participants.filter(participant => {
    const nameMatch = participant.name.toLowerCase().includes(searchkey.toLowerCase());
    const genderMatch = genderFilter === "" || participant.gender.toLowerCase() === genderFilter.toLowerCase();
    return nameMatch && genderMatch;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEdit = (participant) => {
    const params = new URLSearchParams(location.search);
    params.set("editId", participant.id.toString());

    params.delete("addModal");
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  const handleCloseEditModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete("editId");
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  const handleSearchChange = (e) => {
    setSearchkey(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const handleAddButtonClick = () => {
    const params = new URLSearchParams(location.search);
    params.set("addModal", "true");
    params.delete("editId");
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  const handleCloseAddModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete("addModal");
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-100 relative">
        <Dash />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <div className="flex-1 p-2 md:p-1 w-full md:ml-0">
          <div className="bg-white shadow-md p-3 md:p-4 rounded-lg mb-6 mt-12 md:mt-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Participants List</h3>
              <button
                className="border-2 bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 py-2 rounded-full text-sm w-full md:w-auto mt-2 md:mt-0"
                onClick={handleAddButtonClick}
              >
                <i className="fa-solid fa-user-plus mr-1"></i> Add Participant
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex items-center w-full sm:w-64 h-10 border border-blue-800 rounded-full px-4">
                <input
                  type="text"
                  value={searchkey}
                  onChange={handleSearchChange}
                  placeholder="Search Participants Name..."
                  className="w-full bg-transparent outline-none text-sm"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="flex ml-5">
                <div className="relative font-normal text-sm flex items-center w-24 h-10 border border-blue-800 rounded-full px-2 bg-white mr-5">
                  <p className="ml-2 text-gray-500"> Boys: <span className="">40</span></p>
                </div>
                <div className="relative font-normal text-sm flex items-center w-24 h-10 border border-blue-800 rounded-full px-2 bg-white">
                  <p className="ml-3 text-gray-500"> Girls: <span className="">40</span></p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-md min-w-[600px]">
                <thead className="bg-gray-100">
                  <tr className="text-left border-b text-sm text-gray-800">
                    <th className="p-2 md:p-3">Sl.no</th>
                    <th className="p-2 md:p-3">Picture</th>
                    <th className="p-2 md:p-3">Ad No</th>
                    <th className="p-2 md:p-3">Class</th>
                    <th className="p-2 md:p-3">Participants Name</th>
                    <th className="p-2 md:p-3">Gender</th>
                    <th className="p-2 md:p-3">Event Code</th>
                    <th className="p-2 md:p-3">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map((participant, index) => (
                    <tr
                      key={participant.id}
                      className="text-gray-600 odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="text-black p-2 md:p-3">{index + 1}</td>
                      <td className="p-2 md:p-3 flex justify-center">
                        <div className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-200">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9UPSnSMoN3AHPpBU2m4qqXRvX-rIDa-TsFXT68oEdGdlwumKyDnc4Vq2ZE4hAbD0w090&usqp=CAU"
                            alt=""
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-2 md:p-3">{participant.adNo}</td>
                      <td className="p-2 md:p-3">{participant.class}</td>
                      <td className="p-2 md:p-3 font-semibold">{participant.name}</td>
                      <td className="p-2 md:p-3">{participant.gender}</td>
                      <td
                        className="p-2 md:p-3 relative"
                        onMouseEnter={() => setHoveredEventCode(participant.id)}
                        onMouseLeave={() => setHoveredEventCode(null)}
                      >
                        {participant.eventCode}...
                        {hoveredEventCode === participant.id && participant.additionalEventCodes && (
                          <div className="absolute z-10 bg-blue-100 border border-blue-200 rounded-md shadow-lg p-2 ml-5 top-0 ">
                            {participant.additionalEventCodes.map((code, idx) => (
                              <div key={idx} className="text-xs text-gray-700">
                                {code}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="p-2 md:p-3">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEdit(participant)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && <Addparticipat onClose={handleCloseAddModal} />}
      {isEditModalOpen && selectedParticipant && (
        <Editparticipate participant={selectedParticipant} onClose={handleCloseEditModal} />
      )}
    </>
  );
};

export default ParticipateList



