import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';

const AllKalolsavam = () => {
    const navigate = useNavigate();

    const filteredParticipants = [
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
    ];

    const handleEditClick = (kalolsavam) => {
        // Navigate to edit page with the specific kalolsavam ID
        navigate(`/edit-kalolsavam/${kalolsavam.id}`, { 
            state: { kalolsavam } 
        });
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-6 mt-4">
                    <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%] mb-4">
                        Define Kalolsavam
                    </h2>
                    <table className="w-full min-w-[600px]">
                        <thead className="">
                            <tr className="text-left text-sm text-gray-800">
                                <th className="p-2 md:p-3">Sl.no</th>
                                <th className="p-2 md:p-3">Kalolsavam Name</th>
                                <th className="p-2 md:p-3">Year</th>
                                <th className="p-2 md:p-3">Venue</th>
                                <th className="p-2 md:p-3">Start Date</th>
                                <th className="p-2 md:p-3">End Date</th>
                                <th className="p-2 md:p-3">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredParticipants.map((kalolsavam, index) => (
                                <tr
                                    key={kalolsavam.id}
                                    className="text-[#616262] hover:bg-gray-100"
                                >
                                    <td className="text-black p-2 md:p-3">{index + 1}</td>
                                    <td className="p-2 md:p-3 font-semibold">{kalolsavam.kalolsavamName}</td>
                                    <td className="p-2 md:p-3">{kalolsavam.year}</td>
                                    <td className="p-2 md:p-3">{kalolsavam.venue}</td>
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
    );
};

export default AllKalolsavam;