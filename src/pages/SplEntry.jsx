import React, { useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const SplEntry = () => {
    const [participants, setParticipants] = useState([{ id: 1 }]);
    const [remarkText, setRemarkText] = useState('');
    const [isPrimary, setIsPrimary] = useState(false);

    const addParticipant = () => {
        const newParticipantId = participants.length > 0
            ? Math.max(...participants.map(p => p.id)) + 1
            : 1;
        setParticipants([...participants, { id: newParticipantId }]);
    };

    const removeParticipant = (idToRemove) => {
      
        if (participants.length > 1) {
            setParticipants(participants.filter(p => p.id !== idToRemove));
        }
    };

    const handleRemarkChange = (e) => {
      
        const text = e.target.value.slice(0, 200);
        setRemarkText(text);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen overflow-x-hidden">
                <Dash />
                <div className='ml-5 w-full'>
                    <form className="bg-white p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-semibold">Special Order Entry</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#003566] mt-5 ml-14">
                            <div className="flex items-center space-x-4 ml-1">
                                <label className="font-semibold text-blue-900 w-40">School Code</label>
                                <input
                                    type="text"
                                    name="schoolCode"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-4 ml-8">
                                <label className="font-semibold text-blue-900 w-40">School Name</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                        </div>

                        <div className="mt-6 ml-2">
                            <div className="flex mb-5">
                                <h3 className="text-xl text-gray-600 font-semibold">Participants</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4 ml-14">
                                    {participants.map((participant, index) => (
                                        <div
                                            key={participant.id}
                                            className="flex items-center space-x-4"
                                        >
                                            <label className="font-semibold text-blue-900 w-40">
                                                {index === 0 ? 'Participants' : `Participants ${index + 1}`}
                                            </label>
                                            <div className="flex flex-col">
                                                <select
                                                    name={`participants${index + 1}`}
                                                    className="border border-blue-900 px-2 py-1 rounded-full w-80 mb-2"
                                                >
                                                    <option value="">Select Participant</option>
                                                    <option value="participant1">Participant 1</option>
                                                    <option value="participant2">Participant 2</option>
                                                    <option value="participant3">Participant 3</option>
                                                </select>
                                                <div className="flex space-x-2 ml-48">
                                                    {index === participants.length - 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={addParticipant}
                                                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-2 py-1 rounded-full"
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

                                    <div className="flex items-center space-x-4">
                                        <label className="font-semibold text-blue-900 w-40">Special Order</label>
                                        <select
                                            name="specialOrder"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                        >
                                            <option value="">Select Special Order</option>
                                            <option value="order1">Special Order 1</option>
                                            <option value="order2">Special Order 2</option>
                                            <option value="order3">Special Order 3</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <label className="font-semibold text-blue-900 w-40">Item Code</label>
                                        <input
                                            type="text"
                                            name="itemCode"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 ml-14">
                                    <div className="flex items-center space-x-4">
                                        <label className="font-semibold text-blue-900 w-40">Gender</label>
                                        <select
                                            name="gender"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Boy</option>
                                            <option value="female">Girl</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <label className="font-semibold text-blue-900 w-40">Class</label>
                                        <input
                                            type="number"
                                            name="class"
                                            className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <label className="font-semibold text-blue-900 w-40">Captain Adno</label>
                                        <div className="flex flex-col">
                                            <input
                                                type="number"
                                                name="captainAdno"
                                                className="border border-blue-900 px-2 py-1 rounded-full w-80 mb-2"
                                            />
                                            <div className="flex items-center  space-x-2 ml-60">
                                                <input
                                                    type="checkbox"
                                                    id="isPrimary"
                                                    checked={isPrimary}
                                                    onChange={(e) => setIsPrimary(e.target.checked)}
                                                    className="form-checkbox border border-blue-500 h-5 w-5 text-blue-600"
                                                />
                                                <label 
                                                    htmlFor="isPrimary" 
                                                    className="text-sm text-blue-900"
                                                >
                                                    Is Primary
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-span-2 flex justify-start items-start space-x-4 ml-14 mt-6 relative">
                                    <label className="font-semibold text-blue-900 w-40 pt-2">Remark</label>
                                    <div className="flex-grow max-w-[calc(100%-12rem)]">
                                        <textarea
                                            name="remark"
                                            value={remarkText}
                                            onChange={handleRemarkChange}
                                            className="border border-blue-900 h-32 px-4 py-2 rounded-3xl w-full"
                                            maxLength={200}
                                            placeholder="Enter your remarks here (max 200 characters)"
                                        />
                                        <div className="text-right text-gray-500 text-sm mt-1">
                                            {remarkText.length}/200
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-16 text-right mr-20'>
                            <button className='bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-10 text-white py-2'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SplEntry