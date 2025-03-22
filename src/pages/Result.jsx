import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Result1 from "../components/Result1"
import Dash from "../components/Dash"

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search") || "";
    
    const [searchTerm, setSearchTerm] = useState(searchParam);
    const [aGradeResults, setAGradeResults] = useState([])
    console.log(aGradeResults);

    useEffect(() => {
        getAGradeResults()
    }, [])

    const getAGradeResults = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAGradeResults(reqHeader)
                if (result.status === 200) {
                    setAGradeResults(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        
        navigate({
            pathname: location.pathname,
            search: params.toString()
        }, { replace: true });
    }, [searchTerm, navigate, location.pathname]);

    const filteredParticipants = aGradeResults.filter(participant => 
        participant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash/>

                <div className="flex-1 ">
                    <div className="bg-gray-100 p-1 md:p-1 rounded-lg">
                        <h2 className="font-bold text-lg mb-4">Points</h2>
                        <Result1 />
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mt-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-dark-700">
                                Participants A Grade List
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
                                        <th className="p-2 md:p-3">Sl No</th>
                                        <th className="p-2 md:p-3">Picture</th>
                                        <th className="p-2 md:p-3">Reg No</th>
                                        <th className="p-2 md:p-3">Ad No</th>
                                        <th className="p-2 md:p-3">Participants Name</th>
                                        <th className="p-2 md:p-3">Event Code</th>
                                        <th className="p-2 md:p-3">Grade</th>
                                        <th className="p-2 md:p-3">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParticipants.map((participant, index) => (
                                        <tr key={participant._id} className="border-b hover:bg-gray-100 text-sm md:text-base">
                                            <td className="p-2 md:p-3 text-center">{index + 1}</td>
                                            <td className="p-2 md:p-3 flex justify-center">
                                                <i className="fa-solid fa-user"></i>
                                            </td>
                                            <td className="p-2 text-gray-600 md:p-3 text-center">{participant.regNo}</td>
                                            <td className="p-2 text-gray-600 md:p-3 text-center">{participant.adNo}</td>
                                            <td className="p-2 md:p-3 font-semibold text-gray-800 text-center">
                                                {participant.name}
                                            </td>
                                            <td className="p-2 md:p-3 text-gray-600 text-center">{participant.eventCode}</td>
                                            <td className="p-2 md:p-3 text-center font-semibold">{participant.grade}</td>
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

export default Result