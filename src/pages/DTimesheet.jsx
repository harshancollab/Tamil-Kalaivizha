
import React, { useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
// import { AddCallSheetAPI } from '../services/allAPI';

const DTimesheet = () => {
    // Create separate states for each form
    const [itemCallsheet, setItemCallsheet] = useState({
        Festival: "", 
        Item: ""
    });
    
    const [festivalCallsheet, setFestivalCallsheet] = useState({
        Festival: ""
    });
    
    const [dateStageCallsheet, setDateStageCallsheet] = useState({
        Date: "", // Changed from Festival to Date
        Stage: "", // Changed from Item to Stage
        
    });

    // Sample call sheet data for print preview
    const callSheetData = [
        { slNo: 1, registerNo: '17', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 2, registerNo: '190', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 3, registerNo: '149', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 4, registerNo: '301', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
        { slNo: 5, registerNo: '340', cluster: 1, codeNo: '', signOfParticipants: '', remarks: '' },
    ];

    // Session time options
   

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
                    const result = await (reqBody, reqHeaders);
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
            // Print the report directly
            const formattedDate = formatDate(dateStageCallsheet.Date);
            
           
            
            handlePrint("dateStage", `${formattedDate} - ${dateStageCallsheet.Stage} `);
            setDateStageCallsheet({ Date: "", Stage: "" });
        } else {
            alert("Please select date, stage and session time");
        }
    };

    // Print functionality
    const handlePrint = (type, title) => {
        const originalContents = document.body.innerHTML;
        
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
        
        // Create report title based on type
        let reportTitle = "Time Sheet";
        let stageInfo = "";
        
        if (type === "festival") {
            reportTitle = `Time Sheet - ${title} `;
        } else if (type === "dateStage") {
            const [date, stage] = title.split(" - ");
            reportTitle = `Time Sheet Tamil Kalaivizha - ${title} `;
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
        
        // Header info
        const headerInfo = `
            <div class="header-info">
                ${stageInfo}
            </div>
        `;
        
        // Footer info
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
        
        document.body.innerHTML = `
            <style type="text/css" media="print">
                @page {
                    size: auto;
                    margin: 0.5cm;
                }
                body {
                    padding: 20px;
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
        
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Reload the page after printing to restore all functionalities
    };

    return (
        <>
            <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-4 md:p-6 mt-4 w-full overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4"> Stage Report - Time Sheet</h2>

                    <div className="space-y-6">
                        {/* Call Sheet (Item) */}
                        <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4"> Time Sheet (Item)</h3>
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
                                                    <option value="Festival">Festival</option>
                                                    <option value="Festival 4">Festival 4</option>
                                                    <option value="Festival 5">Festival 5</option>
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
                                                    <option value="">Select Item </option>
                                                    <option value="Drama">Drama</option>
                                                    <option value="Essay">Essay</option>
                                                    <option value="Story">Story</option>
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
                            <h3 className="text-md font-semibold mb-4"> Time Sheet (Festival Wise)</h3>
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
                                                    <option value="Festival 1">Festival 1</option>
                                                    <option value="Festival 2">Festival 2</option>
                                                    <option value="Festival 3">Festival 3</option>
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
                            <h3 className="text-md font-semibold mb-4"> Time Sheet (Date & Stage Wise)</h3>
                            <form onSubmit={handleDateStageReport}>
                                <div className="flex justify-center">
                                    <div className="space-y-4 w-full max-w-md">
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Date</label>
                                            <div className="w-full md:w-80">
                                                <input
                                                    type="date"
                                                    name="Date"
                                                    value={dateStageCallsheet.Date}
                                                    onChange={handleDateStageChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                />
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
                                                    <option value="">Select Stage </option>
                                                    <option value="Stage 1">Stage 1</option>
                                                    <option value="Stage 2">Stage 2</option>
                                                    <option value="Stage 3">Stage 3</option>
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


export default DTimesheet