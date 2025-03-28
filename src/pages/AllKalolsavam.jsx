import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllKalolsavamAPI } from '../services/allAPI'

const AllKalolsavam = () => {
    const navigate = useNavigate();
    const [kalolsavams, setKalolsavams] = useState([]);
    const [loading, setLoading] = useState(false); // 
    const [error, setError] = useState(null);

    const dummyKalolsavams = [
        {
            id: 1,
            kalolsavamName: "Kerala School Kalolsavam",
            year: 2024,
            venue: "Kochi",
            startDate: "2024-12-01",
            endDate: "2024-12-05",
        },
        {
            id: 2,
            kalolsavamName: "District Arts Fest",
            year: 2023,
            venue: "Trivandrum",
            startDate: "2023-11-15",
            endDate: "2023-11-18",
        },
        {
            id: 3,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 4,
            kalolsavamName: "State Level Arts Festival",
            year: 2024,
            venue: "Malappuram",
            startDate: "2024-03-10",
            endDate: "2024-03-14",
        },
    ];

    useEffect(() => {
       
        setLoading(true);
        setTimeout(() => {
            setKalolsavams(dummyKalolsavams);
            setLoading(false);
        }, 500); 
        
        // getAllKalolsavams();
    }, []);


    const getAllKalolsavams = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };

                const result = await getAllKalolsavamAPI(reqHeader);

                if (result.status === 200) {
                    setKalolsavams(result.data);
                    setLoading(false);
                } else {
                    setError("Failed to fetch Kalolsavam events");
                    setLoading(false);
                }
            } else {
                setError("No authentication token found");
                setLoading(false);
            }
        } catch (err) {
            console.error("Error fetching Kalolsavam events:", err);
            setError("An error occurred while fetching Kalolsavam events");
            setLoading(false);
        }
    };

    const handleEditClick = (kalolsavam) => {
        navigate(`/edit-kalolsavam/${kalolsavam.id}`, {
            state: { kalolsavam }
        });
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 mt-4 w-full">
                        <div className="text-center">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 mt-4 w-full">
                        <div className="text-center text-red-500">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-4 md:p-6 mt-4 w-full overflow-x-auto">
                    <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%] mb-4">
                        Define Kalolsavam
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="text-left text-sm text-gray-800">
                                    <th className="p-2 md:p-3 whitespace-nowrap">Sl.no</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Kalolsavam Name</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Year</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Venue</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Start Date</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">End Date</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kalolsavams.map((kalolsavam, index) => (
                                    <tr
                                        key={kalolsavam.id}
                                        className="text-[#616262] hover:bg-gray-100"
                                    >
                                        <td className="text-black p-2 md:p-3">{index + 1}</td>
                                        <td className="p-2 md:p-3 font-semibold whitespace-nowrap">{kalolsavam.kalolsavamName}</td>
                                        <td className="p-2 md:p-3">{kalolsavam.year}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{kalolsavam.venue}</td>
                                        <td className="p-2 md:p-3">{kalolsavam.startDate}</td>
                                        <td className="p-2 md:p-3">{kalolsavam.endDate}</td>
                                        <td className="p-2 md:p-3">
                                            <button
                                                onClick={() => handleEditClick(kalolsavam)}
                                                className="text-blue-500 hover:text-blue-700"
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
    );
};

export default AllKalolsavam