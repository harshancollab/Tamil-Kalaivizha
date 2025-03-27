import React, { useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const SplEntry = () => {
    const [participants, setParticipants] = useState([{ id: 1 }]);

    const addParticipant = () => {
        const newParticipantId = participants.length > 0 
            ? Math.max(...participants.map(p => p.id)) + 1 
            : 1;
        setParticipants([...participants, { id: newParticipantId }]);
    };

    const removeParticipant = (idToRemove) => {
        // Prevent removing the first participant
        if (participants.length > 1) {
            setParticipants(participants.filter(p => p.id !== idToRemove));
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
                <Dash />
                <div className='ml-5 w-full'>
                    <form className="bg-white p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-semibold">Special Order Entry</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#003566] mt-5 ml-14">
                            <div className="flex flex-col md:flex-row items-start md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">School Code</label>
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="schoolCode"
                                        className="border border-blue-900 px-2 py-1 md:py-1 rounded-full w-full md:w-80"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">School Name</label>
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="schoolName"
                                        className="border border-blue-900 px-2 py-1 md:py-1 rounded-full w-full md:w-80"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 ml-14">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-xl text-gray-600 font-semibold">Participants</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    {participants.map((participant, index) => (
                                        <div 
                                            key={participant.id} 
                                            className="flex flex-col md:flex-row items-start md:space-x-4 relative"
                                        >
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">
                                                {index === 0 ? 'Participants' : `Participants ${index + 1}`}
                                            </label>
                                            <div className="flex flex-col w-full">
                                                <select
                                                    name={`participants${index + 1}`}
                                                    className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80 mb-2"
                                                >
                                                    <option value="">Select Participant</option>
                                                    <option value="participant1">Participant 1</option>
                                                    <option value="participant2">Participant 2</option>
                                                    <option value="participant3">Participant 3</option>
                                                </select>
                                                <div className="flex ml-64 space-x-2">
                                                    {index === participants.length - 1 && (
                                                        <button 
                                                            type="button"
                                                            onClick={addParticipant}
                                                            className="bg-blue-500 text-white px-2 py-1 rounded-full"
                                                        >
                                                            + Add
                                                        </button>
                                                    )}
                                                    {participants.length > 1 && index === participants.length - 1 && (
                                                        <button 
                                                            type="button"
                                                            onClick={() => removeParticipant(participant.id)}
                                                            className="border border-red-600 text-red-500 px-2 py-1 rounded-full"
                                                        >
                                                             Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex flex-col md:flex-row items-start md:space-x-4">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Special Order</label>
                                        <select
                                            name="specialOrder"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                                        >
                                            <option value="">Select Special Order</option>
                                            <option value="order1">Special Order 1</option>
                                            <option value="order2">Special Order 2</option>
                                            <option value="order3">Special Order 3</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:space-x-4">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Code</label>
                                        <input
                                            type="text"
                                            name="itemCode"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col md:flex-row items-start md:space-x-4">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Gender</label>
                                        <select
                                            name="gender"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Boy</option>
                                            <option value="female">Girl</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:space-x-4">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Class</label>
                                        <input
                                            type="number"
                                            name="age"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:space-x-4">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Captain Adno</label>
                                        <input
                                            type="number"
                                            name="age"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-80"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-start md:space-x-4 mt-14">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Remark</label>
                                        <input
                                            type="number"
                                            name="age"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-full md:w-3/4"
                                        />
                                    </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SplEntry