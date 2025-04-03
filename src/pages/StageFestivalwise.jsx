// import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { useNavigate } from 'react-router-dom'
// import { AllStageFestivalwise } from '../services/allAPI'

// const StageFestivalwise = () => {
//     const [Allitemise, setItemwise] = useState([]);
//     const [selectedFestival, setSelectedFestival] = useState('UP'); // Add state for selected festival
//     console.log(Allitemise);

//     useEffect(() => {
//         getAllitemise()
//     }, [])

//     const getAllitemise = async () => {
//         const token = sessionStorage.getItem('token') // Fixed missing method name
//         if (token) {
//             const reqHeader = {
//                 "Authorization": `Bearer ${token}`
//             }
//             try {
//                 const result = await AllStageFestivalwise(reqHeader)
//                 if (result.status === 200) { // Changed == to ===
//                     setItemwise(result.data) // Changed setStages to setItemwise to match state variable
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }

//     const navigate = useNavigate();

//     const handleAddClick = () => {
//         navigate('/Addfestivalwise');
//     };

//     // Handle festival selection change
//     const handleFestivalChange = (e) => {
//         setSelectedFestival(e.target.value);
//     };

//     const dummyStages = [
//         {
//             id: 1,
//             itemCode: '3001',
//             itemName: 'Item1',
//             noOfParticipants: 50,
//             date: '2025-04-05',
//             hours: 9,
//             minutes: 0,
//             stageName: 'Stage 1',
//             noOfCluster: 5,
//             noOfJudges: 3,
//         },
//         {
//             id: 2,
//             itemCode: '4004',
//             itemName: 'Item 2',
//             noOfParticipants: 25,
//             date: '2025-04-06',
//             hours: 14,
//             minutes: 30,
//             stageName: 'stage 3',
//             noOfCluster: 2,
//             noOfJudges: 5,
//         },
//         {
//             id: 3,
//             itemCode: '4003',
//             itemName: 'item 3',
//             noOfParticipants: 15,
//             date: '2025-04-07',
//             hours: 10,
//             minutes: 15,
//             stageName: 'Stage 4',
//             noOfCluster: 1,
//             noOfJudges: 7,
//         },
//         {
//             id: 4,
//             itemCode: '3454',
//             itemName: 'Item 4',
//             noOfParticipants: 60,
//             date: '2025-04-05',
//             hours: 11,
//             minutes: 45,
//             stageName: 'stage 4',
//             noOfCluster: 6,
//             noOfJudges: 2,
//         },
//         {
//             id: 5,
//             itemCode: '3405',
//             itemName: 'item 5',
//             noOfParticipants: 30,
//             date: '2025-04-06',
//             hours: 16,
//             minutes: 0,
//             stageName: 'Stage 5',
//             noOfCluster: 3,
//             noOfJudges: 4,
//         },
//     ];

//     const handleEditClick = (itemId) => {
//         navigate(`/Edit-festwiseList/${itemId}`);
//     };

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 <div className="flex-1 p-4 md:p-6 lg:p-8">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
//                             {selectedFestival} - Stage Allotment Festival Wise List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2">
//                             <div className="relative w-full sm:w-20">
//                                 <select
//                                     className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                     value={selectedFestival}
//                                     onChange={handleFestivalChange}
//                                 >
//                                     <option value="UP">UP</option>
//                                     <option value="LP">LP</option>
//                                 </select>
//                                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                     <i className="fa-solid fa-chevron-down"></i>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-center border-separate border-spacing-y-2 print-table">
//                                 <thead>
//                                     <tr className="text-gray-700 ">
//                                         <th className="p-2 md:p-3">Sl No</th>
//                                         <th className="p-2 md:p-3">Item code</th>
//                                         <th className="p-2 md:p-3">Item name</th>
//                                         <th className="p-2 md:p-3">No of participate</th>
//                                         <th className="p-2 md:p-3">Date</th>
//                                         <th className="p-2 md:p-3">Hours</th>
//                                         <th className="p-2 md:p-3">Min</th>
//                                         <th className="p-2 md:p-3">StageName</th>
//                                         <th className="p-2 md:p-3">No of cluster</th>
//                                         <th className="p-2 md:p-3">No of judges</th>
//                                         <th className="p-2 md:p-3">Edit</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {dummyStages.map((stage, index) => (
//                                         <tr key={stage.id} className="hover:bg-gray-200 ">
//                                             <td className="p-2 mr-5 md:p-3">{index + 1}</td>
//                                             <td className="p-2 mr-5 md:p-3">{stage.itemCode}</td>
//                                             <td className="p-2 md:p-3">{stage.itemName}</td>
//                                             <td className="p-2 mr-5 md:p-3">{stage.noOfParticipants}</td>
//                                             <td className="p-2 mr-5 md:p-3">{stage.date}</td>
//                                             <td className="p-2 mr-5 md:p-3">{stage.hours}</td>
//                                             <td className="p-2 mr-5 md:p-3">{stage.minutes}</td>
//                                             <td className="p-2 mr-5 md:p-3">{stage.stageName}</td>
//                                             <td className="p-2 mr-5 md:p-3">{stage.noOfCluster}</td>
//                                             <td className="p-2 md:p-3">{stage.noOfJudges}</td>
//                                             <td className="p-2 md:p-3">
//                                                 <i
//                                                     className="fa-solid text-blue-500 fa-pen-to-square cursor-pointer"
//                                                     onClick={() => handleEditClick(stage.id)}
//                                                 ></i>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
//                         <button
//                             onClick={handleAddClick}
//                             type="button"
//                             className="border border-blue-500 text-blue-600 px-6 sm:px-10 md:px-14 py-2  rounded-full"
//                         >
//                             Add
//                         </button>
//                         <button
//                             type="button"
//                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-6 sm:px-10 md:px-14 py-2 rounded-full"
//                         >
//                             Allotement
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default StageFestivalwise


// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Dash from '../components/Dash';
// import { useNavigate } from 'react-router-dom';
// import { AllStageFestivalwise } from '../services/allAPI';

// const StageFestivalwise = () => {
//     const [Allitemise, setItemwise] = useState([]);
//     const [selectedFestival, setSelectedFestival] = useState('UP'); // Add state for selected festival
//     console.log(Allitemise);

//     useEffect(() => {
//         getAllitemise();
//     }, []);

//     const getAllitemise = async () => {
//         const token = sessionStorage.getItem('token'); // Fixed missing method name
//         if (token) {
//             const reqHeader = {
//                 "Authorization": `Bearer ${token}`
//             };
//             try {
//                 const result = await AllStageFestivalwise(reqHeader);
//                 if (result.status === 200) { // Changed == to ===
//                     setItemwise(result.data); // Changed setStages to setItemwise to match state variable
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     };

//     const navigate = useNavigate();

//     const handleAddClick = () => {
//         navigate('/Addfestivalwise');
//     };

//     // Handle festival selection change
//     const handleFestivalChange = (e) => {
//         setSelectedFestival(e.target.value);
//     };

//     const dummyStages = [
//         {
//             id: 1,
//             itemCode: '3001',
//             itemName: 'Item1',
//             noOfParticipants: 50,
//             date: '2025-04-05',
//             hours: 9,
//             minutes: 0,
//             stageName: 'Stage 1',
//             noOfCluster: 5,
//             noOfJudges: 3,
//         },
//         {
//             id: 2,
//             itemCode: '4004',
//             itemName: 'Item 2',
//             noOfParticipants: 25,
//             date: '2025-04-06',
//             hours: 14,
//             minutes: 30,
//             stageName: 'stage 3',
//             noOfCluster: 2,
//             noOfJudges: 5,
//         },
//         {
//             id: 3,
//             itemCode: '4003',
//             itemName: 'item 3',
//             noOfParticipants: 15,
//             date: '2025-04-07',
//             hours: 10,
//             minutes: 15,
//             stageName: 'Stage 4',
//             noOfCluster: 1,
//             noOfJudges: 7,
//         },
//         {
//             id: 4,
//             itemCode: '3454',
//             itemName: 'Item 4',
//             noOfParticipants: 60,
//             date: '2025-04-05',
//             hours: 11,
//             minutes: 45,
//             stageName: 'stage 4',
//             noOfCluster: 6,
//             noOfJudges: 2,
//         },
//         {
//             id: 5,
//             itemCode: '3405',
//             itemName: 'item 5',
//             noOfParticipants: 30,
//             date: '2025-04-06',
//             hours: 16,
//             minutes: 0,
//             stageName: 'Stage 5',
//             noOfCluster: 3,
//             noOfJudges: 4,
//         },
//     ];

//     const handleEditClick = (itemId) => {
//         navigate(`/Edit-festwiseList/${itemId}`);
//     };

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 <div className="flex-1 p-4 md:p-6 lg:p-8">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
//                             {selectedFestival} - Stage Allotment Festival Wise List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2">
//                             <div className="relative w-full sm:w-20">
//                                 <select
//                                     className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                     value={selectedFestival}
//                                     onChange={handleFestivalChange}
//                                 >
//                                     <option value="UP">UP</option>
//                                     <option value="LP">LP</option>
//                                 </select>
//                                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                     <i className="fa-solid fa-chevron-down"></i>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="w-full text-center border-separate border-spacing-y-2 print-table">
//                             <thead>
//                                 <tr className="text-gray-700">
//                                     <th className="p-2 md:p-3 whitespace-nowrap">Sl No</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">Item code</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">Item name</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">No of participate</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">Date</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">Hours</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">Min</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">StageName</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">No of cluster</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">No of judges</th>
//                                     <th className="p-2 md:p-3 whitespace-nowrap">Edit</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {dummyStages.map((stage, index) => (
//                                     <tr key={stage.id} className="hover:bg-gray-200">
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{index + 1}</td>
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{stage.itemCode}</td>
//                                         <td className="p-2 md:p-3 whitespace-nowrap">{stage.itemName}</td>
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{stage.noOfParticipants}</td>
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{stage.date}</td>
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{stage.hours}</td>
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{stage.minutes}</td>
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{stage.stageName}</td>
//                                         <td className="p-2 mr-5 md:p-3 whitespace-nowrap">{stage.noOfCluster}</td>
//                                         <td className="p-2 md:p-3 whitespace-nowrap">{stage.noOfJudges}</td>
//                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                             <i
//                                                 className="fa-solid text-blue-500 fa-pen-to-square cursor-pointer"
//                                                 onClick={() => handleEditClick(stage.id)}
//                                             ></i>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
//                         <button
//                             onClick={handleAddClick}
//                             type="button"
//                             className="border border-blue-500 text-blue-600 px-6 sm:px-10 md:px-14 py-2 rounded-full whitespace-nowrap"
//                         >
//                             Add
//                         </button>
//                         <button
//                             type="button"
//                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-6 sm:px-10 md:px-14 py-2 rounded-full whitespace-nowrap"
//                         >
//                             Allotement
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default StageFestivalwise;


import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useNavigate } from 'react-router-dom';
import { AllStageFestivalwise } from '../services/allAPI';

const StageFestivalwise = () => {
    const [Allitemise, setItemwise] = useState([]);
    const [selectedFestival, setSelectedFestival] = useState('UP');
    console.log(Allitemise);

    useEffect(() => {
        getAllitemise();
    }, []);

    const getAllitemise = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await AllStageFestivalwise(reqHeader);
                if (result.status === 200) {
                    setItemwise(result.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/Addfestivalwise');
    };

    const handleFestivalChange = (e) => {
        setSelectedFestival(e.target.value);
    };

    const dummyStages = [
        {
            id: 1,
            itemCode: '3001',
            itemName: 'Item1',
            noOfParticipants: 50,
            date: '2025-04-05',
            hours: 9,
            minutes: 0,
            stageName: 'Stage 1',
            noOfCluster: 5,
            noOfJudges: 3,
        },
        {
            id: 2,
            itemCode: '4004',
            itemName: 'Item 2',
            noOfParticipants: 25,
            date: '2025-04-06',
            hours: 14,
            minutes: 30,
            stageName: 'stage 3',
            noOfCluster: 2,
            noOfJudges: 5,
        },
        {
            id: 3,
            itemCode: '4003',
            itemName: 'item 3',
            noOfParticipants: 15,
            date: '2025-04-07',
            hours: 10,
            minutes: 15,
            stageName: 'Stage 4',
            noOfCluster: 1,
            noOfJudges: 7,
        },
        {
            id: 4,
            itemCode: '3454',
            itemName: 'Item 4',
            noOfParticipants: 60,
            date: '2025-04-05',
            hours: 11,
            minutes: 45,
            stageName: 'stage 4',
            noOfCluster: 6,
            noOfJudges: 2,
        },
        {
            id: 5,
            itemCode: '3405',
            itemName: 'item 5',
            noOfParticipants: 30,
            date: '2025-04-06',
            hours: 16,
            minutes: 0,
            stageName: 'Stage 5',
            noOfCluster: 3,
            noOfJudges: 4,
        },
    ];

    const handleEditClick = (itemId) => {
        navigate(`/Edit-festwiseList/${itemId}`);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-3 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                        <h2 className="text-[18px] md:text-[20px] font-[600] leading-[100%] tracking-[2%]">
                            {selectedFestival} - Stage Allotment Festival Wise List
                        </h2>
                        <div className="w-full sm:w-auto">
                            <div className="relative w-16">
                                <select
                                    className="border-blue-800 border text-blue-700 px-2 py-1 text-xs rounded-full w-full bg-white cursor-pointer appearance-none pr-5"
                                    value={selectedFestival}
                                    onChange={handleFestivalChange}
                                >
                                    <option value="UP">UP</option>
                                    <option value="LP">LP</option>
                                </select>
                                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-separate border-spacing-y-2 print-table">
                            <thead>
                                <tr className="text-gray-700">
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">Sl No</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">Item code</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">Item name</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">No of participate</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">Date</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">Hours</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">Min</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">StageName</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">No of cluster</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">No of judges</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyStages.map((stage, index) => (
                                    <tr key={stage.id} className="hover:bg-gray-100 text-xs md:text-sm">
                                        <td className="p-2 md:p-3 whitespace-nowrap">{index + 1}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.itemCode}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.itemName}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.noOfParticipants}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.date}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.hours}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.minutes}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.stageName}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.noOfCluster}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{stage.noOfJudges}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                            <i
                                                className="fa-solid text-blue-500 fa-pen-to-square cursor-pointer"
                                                onClick={() => handleEditClick(stage.id)}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-3 mt-6">
                        <button
                            onClick={handleAddClick}
                            type="button"
                            className="border border-blue-500 text-blue-600 px-4 sm:px-8 md:px-14 py-2 rounded-full whitespace-nowrap"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-8 md:px-14 py-2 rounded-full whitespace-nowrap"
                        >
                            Allotement
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StageFestivalwise;