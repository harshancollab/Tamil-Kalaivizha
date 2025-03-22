import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Result1 from "../components/Result1"
import Dash from "../components/Dash"

const Bgrade = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search") || "";
    
    const [searchTerm, setSearchTerm] = useState(searchParam);
    const [participants, setParticipants] = useState([
        { id: 1, regNo: 200, adNo: 3010, name: "Jayam Deva", eventCode: 504, grade: "B Grade", points: 5 },
        { id: 2, regNo: 201, adNo: 3011, name: "Priya Singh", eventCode: 504, grade: "B Grade", points: 8 },
        { id: 3, regNo: 202, adNo: 3012, name: "Rahul Kumar", eventCode: 505, grade: "B Grade", points: 7 },
        { id: 4, regNo: 203, adNo: 3013, name: "Arun Sharma", eventCode: 506, grade: "B Grade", points: 6 },
        { id: 5, regNo: 204, adNo: 3014, name: "Nisha Patel", eventCode: 507, grade: "B Grade", points: 9 },
        { id: 6, regNo: 205, adNo: 3015, name: "Vijay Reddy", eventCode: 508, grade: "B Grade", points: 4 },
        { id: 7, regNo: 206, adNo: 3016, name: "Sanjay Gupta", eventCode: 509, grade: "B Grade", points: 3 },
        { id: 8, regNo: 207, adNo: 3017, name: "Kiran Mehta", eventCode: 510, grade: "B Grade", points: 10 }
    ]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        
        navigate({
            pathname: location.pathname,
            search: params.toString()
        }, { replace: true });
    }, [searchTerm, navigate, location.pathname]);

    const filteredParticipants = participants.filter(participant => 
        participant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />

                <div className="flex-1 ">
                    <div className="bg-gray-100 p-4 md:p-6 rounded-lg">
                        <h2 className="font-bold text-lg mb-4">Points</h2>
                        <Result1 />
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mt-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-dark-700">
                                Participants B Grade List
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search Participants Name..."
                                    className="border-blue-800 border px-3 py-2 rounded-full w-full pr-10"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="text-gray-700 text-sm md:text-base">
                                        <th className="p-2 md:p-3 ">Sl No</th>
                                        <th className="p-2 md:p-3 ">Picture</th>
                                        <th className="p-2 md:p-3 ">Reg No</th>
                                        <th className="p-2 md:p-3">Ad No</th>
                                        <th className="p-2 md:p-3 ">Participants Name</th>
                                        <th className="p-2 md:p-3 ">Event Code</th>
                                        <th className="p-2 md:p-3 ">Grade</th>
                                        <th className="p-2 md:p-3 ">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParticipants.map((participant, index) => (
                                        <tr key={participant.id} className="border-b hover:bg-gray-100 text-sm md:text-base">
                                            <td className="p-2 md:p-3 text-center">{index + 1}</td>
                                            <td className="p-2 md:p-3 flex justify-center">
                                               <img src="" alt="" />
                                            </td>
                                            <td className="p-2 text-gray-600 md:p-3 text-center">{participant.regNo}</td>
                                            <td className="p-2 text-gray-600 md:p-3 text-center">{participant.adNo}</td>
                                            <td className="p-2 md:p-3 font-semibold text-gray-800 text-center">
                                                {participant.name}
                                            </td>
                                            <td className="p-2 md:p-3 text-gray-600 text-center">{participant.eventCode}</td>
                                            <td className="p-2 md:p-3 text-center font-semibold ">{participant.grade}</td>
                                            <td className="p-2 md:p-3 text-center text-blue-500 font-semibold cursor-pointer">
                                                {participant.points.toString().padStart(2, '0')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bgrade