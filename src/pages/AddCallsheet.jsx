// import React, { useState } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { AddCallSheetAPI } from '../services/allAPI'

// const AddCallsheet = () => {
//     const [callsheet, setCallsheet] = useState({
//         Festival: "", Item: ""
//     })
//     console.log(callsheet);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCallsheet({ ...callsheet, [name]: value });
//     }

//     const handleAddcallsheet = async (e) => {
//         e.preventDefault();
//         const { Festival, Item } = callsheet
//         if (Festival && Item) {
//             // alert("proceed to api")
//             const reqBody = new FormData()
//             reqBody.append("Festival", Festival)
//             reqBody.append("Item", Item)
//             const token = sessionStorage.getItem("token")
//             if (token) {
//                 const reqHeaders = {
//                     "Authorization": `Bearer ${token}`
//                 }
//                 try {
//                     const result = await AddCallSheetAPI(reqBody, reqHeaders)
//                     if (result.status === 200) {
//                         alert("Callsheet added successfully")

//                         setCallsheet({ Festival: "", Item: "" })
//                     } else {
//                         alert(result.response.data)
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             } else {
//                 alert("Authentication token missing. Please log in again.")
//             }
//         } else {
//             alert("Fill the form completely")
//         }
//     }

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 <div className="p-6 bg-gray-100 w-full min-h-screen">
//                     <h2 className="text-lg font-semibold mb-4">Stage Report - Call Sheet</h2>

//                     <div className="space-y-6">
//                         {/* Call Sheet (Item) */}
//                         <div className="bg-gray-200 p-6 rounded-lg">
//                             <h3 className="text-md font-semibold mb-4">Call Sheet (Item)</h3>
//                             <div className="flex justify-center">
//                                 <div className="space-y-4 ">
//                                     <div className="flex flex-col md:flex-row mb-8 ">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Festival"
//                                                 value={callsheet.Festival}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Festival</option>
//                                                 <option value="UP">UP</option>
//                                                 <option value="LP">LP</option>
//                                                 <option value="HS">HS</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col md:flex-row mb-8">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Name</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Item"
//                                                 value={callsheet.Item}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Item </option>
//                                                 <option value="Drama">Drama</option>
//                                                 <option value="Essay">Essay</option>
//                                                 <option value="Story">Story</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className='text-center mt-10'>
//                                         <button
//                                             type="submit"
//                                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
//                                         >
//                                             Report
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Call Sheet (Festival Wise) */}
//                         <div className="bg-gray-200 p-6 rounded-lg">
//                             <h3 className="text-md font-semibold mb-4">Call Sheet (Festival Wise)</h3>
//                             <div className="flex justify-center">
//                                 <div className="space-y-4 ">
//                                     <div className="flex flex-col md:flex-row mb-8 ">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Festival"
//                                                 value={callsheet.Festival}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Festival</option>
//                                                 <option value="UP">UP</option>
//                                                 <option value="LP">LP</option>
//                                                 <option value="HS">HS</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     <div className='text-center mt-10'>
//                                         <button
//                                             type="submit"
//                                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
//                                         >
//                                             Report
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Call Sheet (Date & Stage Wise) */}
//                         <div className="bg-gray-200 p-6 rounded-lg">
//                             <h3 className="text-md font-semibold mb-4">Call Sheet (Date & Stage Wise)</h3>
//                             <div className="flex justify-center">
//                                 <div className="space-y-4 ">
//                                     <div className="flex flex-col md:flex-row mb-8 ">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Date</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Festival"
//                                                 value={callsheet.Festival}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Date</option>
//                                                 <option value="UP">UP</option>
//                                                 <option value="LP">LP</option>
//                                                 <option value="HS">HS</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col md:flex-row mb-8">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Stage</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Item"
//                                                 value={callsheet.Item}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Item </option>
//                                                 <option value="Drama">Drama</option>
//                                                 <option value="Essay">Essay</option>
//                                                 <option value="Story">Story</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className='text-center mt-10'>
//                                         <button
//                                             type="submit"
//                                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
//                                         >
//                                             Report
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>











//             </div>
//         </>
//     )
// }

// export default AddCallsheet

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { AddCallSheetAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const AddCallsheet = () => {
    // Create separate states for each form
    const [itemCallsheet, setItemCallsheet] = useState({
        Festival: "", 
        Item: ""
    });
    
    const [festivalCallsheet, setFestivalCallsheet] = useState({
        Festival: ""
    });
    
    const [dateStageCallsheet, setDateStageCallsheet] = useState({
        Date: "",
        Stage: "",
    });

    // Dummy data for dropdown options
    const dummyData = {
        festivals: [
            { id: 1, name: "UP Tamil Kalaivizha" },
            { id: 2, name: "Lp Tamil Kalaivizha" },
            { id: 3, name: "Hs Tamil Kalaivizha" },
           
        ],
        items: [
            { id: 1, name: "Drama" },
            { id: 2, name: "Essay" },
            { id: 3, name: "Story" },
            { id: 4, name: "Music" },
            { id: 5, name: "Dance" },
            { id: 6, name: "Poetry" }
        ],
        dates: [
            { id: 1, value: "2023-12-05", display: "5 Dec 2023" },
            { id: 2, value: "2023-12-10", display: "10 Dec 2023" },
            { id: 3, value: "2023-12-15", display: "15 Dec 2023" },
            { id: 4, value: "2023-12-20", display: "20 Dec 2023" },
            { id: 5, value: "2023-12-27", display: "27 Dec 2023" }
        ],
        stages: [
            { id: 1, name: "Stage 1" },
            { id: 2, name: "Stage 2" },
            { id: 3, name: "Stage 3" },
            { id: 4, name: "Stage 4" },
            { id: 5, name: "All Stage" }
        ]
    };

    // Load html2pdf dynamically (since it's a client-side library)
    useEffect(() => {
        // You might want to add a script loader here if not using import
        // This is just a placeholder in case you need to initialize anything
    }, []);

    // Sample call sheet data for print preview
    const callSheetData = [
        { slNo: 1, registerNo: '17', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 2, registerNo: '190', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 3, registerNo: '149', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 4, registerNo: '301', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 5, registerNo: '340', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
    ];

    // Handle changes for the Item form
    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItemCallsheet({ ...itemCallsheet, [name]: value });
    };
    
    // Handle changes for the Festival form
    const handleFestivalChange = (e) => {
        const { name, value } = e.target;
        setFestivalCallsheet({ ...festivalCallsheet, [name]: value });
    };
    
    // Handle changes for the Date & Stage form
    const handleDateStageChange = (e) => {
        const { name, value } = e.target;
        setDateStageCallsheet({ ...dateStageCallsheet, [name]: value });
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // API call for Item form with print functionality
    const handleAddcallsheet = async (e) => {
        e.preventDefault();
        const { Festival, Item } = itemCallsheet;
        if (Festival && Item) {
            const reqBody = new FormData();
            reqBody.append("Festival", Festival);
            reqBody.append("Item", Item);
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeaders = {
                    "Authorization": `Bearer ${token}`
                };
                try {
                    const result = await AddCallSheetAPI(reqBody, reqHeaders);
                    if (result.status === 200) {
                        // Print the call sheet after successful API response
                        handlePrint("item", `${Festival} - ${Item}`);
                        setItemCallsheet({ Festival: "", Item: "" });
                    } else {
                        alert(result.response.data);
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert("Authentication token missing. Please log in again.");
            }
        } else {
            alert("Fill the form completely");
        }
    };

    // Function for festival-wise report
    const handleFestivalReport = (e) => {
        e.preventDefault();
        if (festivalCallsheet.Festival) {
            // Print the report directly
            handlePrint("festival", festivalCallsheet.Festival);
            setFestivalCallsheet({ Festival: "" });
        } else {
            alert("Please select a festival");
        }
    };
    
    // Function for date & stage report
    const handleDateStageReport = (e) => {
        e.preventDefault();
        if (dateStageCallsheet.Date && dateStageCallsheet.Stage) {
            // Find the display date from the date value
            const selectedDate = dummyData.dates.find(date => date.value === dateStageCallsheet.Date);
            const displayDate = selectedDate ? selectedDate.display : dateStageCallsheet.Date;
            
            // Print the report directly
            handlePrint("dateStage", `${displayDate} - ${dateStageCallsheet.Stage}`);
            setDateStageCallsheet({ Date: "", Stage: "" });
        } else {
            alert("Please select date and stage");
        }
    };

    // Print functionality using html2pdf
    const handlePrint = (type, title) => {
        // Create report title based on type
        let reportTitle = "Call Sheet";
        let stageInfo = "";
        
        if (type === "festival") {
            reportTitle = `Call Sheet - ${title}`;
        } else if (type === "dateStage") {
            const [date, stage] = title.split(" - ");
            reportTitle = `Call Sheet Tamil Kalaivizha - ${title}`;
            stageInfo = `
                <div class="stage-info">
                    <div><b>Stage No : ${stage}</b></div>
                    <div><b>Date : ${date}</b></div>
                    <div><b>Max Time : 20 Min</b></div>
                </div>
            `;
        } else if (type === "item") {
            const [festival, item] = title.split(" - ");
            reportTitle = `Call Sheet UP Tamil Kalaivizha - 324 ${item}`;
            stageInfo = `
                <div class="stage-info">
                    <div><b>Stage No : Stage 1</b></div>
                    <div><b>Date : 27 Dec 2023</b></div>
                    <div><b>Max Time : 20 Min</b></div>
                </div>
            `;
        }
        
        // Table for call sheet data
        let tableHTML = `
            <table border="1" cellpadding="8" cellspacing="0" class="call-sheet-table">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Register No</th>
                        <th>Cluster</th>
                        <th>Code No</th>
                        <th>Sign of Participants</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        callSheetData.forEach(item => {
            tableHTML += `
                <tr>
                    <td>${item.slNo}</td>
                    <td>${item.registerNo}</td>
                    <td>${item.cluster}</td>
                    <td>${item.codeNo}</td>
                    <td>${item.signOfParticipants}</td>
                    <td>${item.remarks}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        const headerInfo = `
            <div class="header-info">
                ${stageInfo}
            </div>
        `;
        
        const footerInfo = `
            <div class="footer-info">
                <div class="footer-item">
                    <p>No of Participants Registered : 5</p>
                    <p>No of Participants Performed : </p>
                    <p>No of Participants Reported : </p>
                </div>
                <div class="footer-signature">
                    <p>Signature of Stage Manager</p>
                </div>
            </div>
        `;
        
        // Create a container element for PDF content
        const element = document.createElement('div');
        element.innerHTML = `
            <style>
                body {
                    font-family: sans-serif;
                }
                .print-title {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 18px;
                    font-weight: bold;
                }
                .header-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    border: 1px solid #000;
                    padding: 10px;
                }
                .stage-info {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 5px 10px;
                }
                .call-sheet-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .call-sheet-table th, .call-sheet-table td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: center;
                }
                .footer-info {
                    margin-top: 40px;
                    display: flex;
                    justify-content: space-between;
                }
                .footer-signature {
                    text-align: right;
                    margin-top: 50px;
                }
            </style>
            <div class="print-title">${reportTitle}</div>
            ${headerInfo}
            ${tableHTML}
            ${footerInfo}
        `;
        
        // Configure html2pdf options
        const opt = {
            margin: 10,
            filename: `${reportTitle.replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Generate PDF
        html2pdf().from(element).set(opt).save().then(() => {
            console.log('PDF generated successfully');
        });
    };

    return (
        <>
            <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-4 md:p-6 mt-4 w-full overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4">Stage Report - Call Sheet</h2>

                    <div className="space-y-6">
                        {/* Call Sheet (Item) */}
                        <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Call Sheet (Item)</h3>
                            <form onSubmit={handleAddcallsheet}>
                                <div className="flex justify-center">
                                    <div className="space-y-4 w-full max-w-md">
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Festival Type</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Festival"
                                                    value={itemCallsheet.Festival}
                                                    onChange={handleItemChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Festival</option>
                                                    {dummyData.festivals.map(festival => (
                                                        <option key={festival.id} value={festival.name}>
                                                            {festival.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Item Name</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Item"
                                                    value={itemCallsheet.Item}
                                                    onChange={handleItemChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Item</option>
                                                    {dummyData.items.map(item => (
                                                        <option key={item.id} value={item.name}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='text-center mt-6 md:mt-10'>
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-10 md:px-14 py-2 md:py-3 rounded-full mt-4"
                                            >
                                                Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Call Sheet (Festival Wise) */}
                        <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Call Sheet (Festival Wise)</h3>
                            <form onSubmit={handleFestivalReport}>
                                <div className="flex justify-center">
                                    <div className="space-y-4 w-full max-w-md">
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Festival Type</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Festival"
                                                    value={festivalCallsheet.Festival}
                                                    onChange={handleFestivalChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Festival</option>
                                                    {dummyData.festivals.map(festival => (
                                                        <option key={festival.id} value={festival.name}>
                                                            {festival.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className='text-center mt-6 md:mt-10'>
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-10 md:px-14 py-2 md:py-3 rounded-full mt-4"
                                            >
                                                Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Call Sheet (Date & Stage Wise) */}
                        <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Call Sheet (Date & Stage Wise)</h3>
                            <form onSubmit={handleDateStageReport}>
                                <div className="flex justify-center">
                                    <div className="space-y-4 w-full max-w-md">
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Date</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Date"
                                                    value={dateStageCallsheet.Date}
                                                    onChange={handleDateStageChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Date</option>
                                                    {dummyData.dates.map(date => (
                                                        <option key={date.id} value={date.value}>
                                                            {date.display}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Stage</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Stage"
                                                    value={dateStageCallsheet.Stage}
                                                    onChange={handleDateStageChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Stage</option>
                                                    {dummyData.stages.map(stage => (
                                                        <option key={stage.id} value={stage.name}>
                                                            {stage.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className='text-center mt-6 md:mt-10'>
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-10 md:px-14 py-2 md:py-3 rounded-full mt-4"
                                            >
                                                Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default AddCallsheet