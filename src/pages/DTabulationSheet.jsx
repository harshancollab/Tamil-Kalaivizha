import React, { useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
// import { AddTabulationSheetAPI } from '../services/allAPI';

const DTabulationSheet = () => {
    // Create separate states for each form
    const [itemTabulationSheet, setItemTabulationSheet] = useState({
        Festival: "",
        Item: "",
        NumberOfParticipants: ""
    });
    
    const [festivalTabulationSheet, setFestivalTabulationSheet] = useState({
        Festival: ""
    });
    
    const [dateStageSheet, setDateStageSheet] = useState({
        Date: "",
        Stage: ""
    });

    // Sample tabulation data for print preview
    const tabulationData = [
        { slNo: 1, registerNo: '17', cluster: 1, codeNo: 'A1', marks: 85, rank: 1, remarks: '' },
        { slNo: 2, registerNo: '190', cluster: 1, codeNo: 'A2', marks: 79, rank: 3, remarks: '' },
        { slNo: 3, registerNo: '149', cluster: 1, codeNo: 'A3', marks: 82, rank: 2, remarks: '' },
        { slNo: 4, registerNo: '301', cluster: 1, codeNo: 'A4', marks: 76, rank: 4, remarks: '' },
        { slNo: 5, registerNo: '340', cluster: 1, codeNo: 'A5', marks: 71, rank: 5, remarks: '' },
    ];

    // Handle changes for the Item form
    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItemTabulationSheet({ ...itemTabulationSheet, [name]: value });
    };
    
    // Handle changes for the Festival form
    const handleFestivalChange = (e) => {
        const { name, value } = e.target;
        setFestivalTabulationSheet({ ...festivalTabulationSheet, [name]: value });
    };
    
    // Handle changes for the Date & Stage form
    const handleDateStageChange = (e) => {
        const { name, value } = e.target;
        setDateStageSheet({ ...dateStageSheet, [name]: value });
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
    const handleAddTabulationSheet = async (e) => {
        e.preventDefault();
        const { Festival, Item, NumberOfParticipants } = itemTabulationSheet;
        if (Festival && Item && NumberOfParticipants) {
            const reqBody = new FormData();
            reqBody.append("Festival", Festival);
            reqBody.append("Item", Item);
            reqBody.append("NumberOfParticipants", NumberOfParticipants);
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeaders = {
                    "Authorization": `Bearer ${token}`
                };
                try {
                    // Uncomment when API is ready
                    // const result = await AddTabulationSheetAPI(reqBody, reqHeaders);
                    // if (result.status === 200) {
                    //     // Print the tabulation sheet after successful API response
                    //     handlePrint("item", `${Festival} - ${Item}`);
                    //     setItemTabulationSheet({ Festival: "", Item: "", NumberOfParticipants: "" });
                    // } else {
                    //     alert(result.response.data);
                    // }
                    
                    // For now, just print without API call
                    handlePrint("item", `${Festival} - ${Item}`);
                    setItemTabulationSheet({ Festival: "", Item: "", NumberOfParticipants: "" });
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
        if (festivalTabulationSheet.Festival) {
            // Print the report directly
            handlePrint("festival", festivalTabulationSheet.Festival);
            setFestivalTabulationSheet({ Festival: "" });
        } else {
            alert("Please select a festival");
        }
    };
    
    // Function for date & stage report
    const handleDateStageReport = (e) => {
        e.preventDefault();
        if (dateStageSheet.Date && dateStageSheet.Stage) {
            // Print the report directly
            const formattedDate = formatDate(dateStageSheet.Date);
            handlePrint("dateStage", `${formattedDate} - ${dateStageSheet.Stage}`);
            setDateStageSheet({ Date: "", Stage: "" });
        } else {
            alert("Please select date and stage");
        }
    };

    // Print functionality
    const handlePrint = (type, title) => {
        const originalContents = document.body.innerHTML;
        
        // Table for tabulation sheet data
        let tableHTML = `
            <table border="1" cellpadding="8" cellspacing="0" class="tabulation-sheet-table">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Register No</th>
                        <th>Cluster</th>
                        <th>Code No</th>
                        <th>Marks</th>
                        <th>Rank</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        tabulationData.forEach(item => {
            tableHTML += `
                <tr>
                    <td>${item.slNo}</td>
                    <td>${item.registerNo}</td>
                    <td>${item.cluster}</td>
                    <td>${item.codeNo}</td>
                    <td>${item.marks}</td>
                    <td>${item.rank}</td>
                    <td>${item.remarks}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        // Create report title based on type
        let reportTitle = "Tabulation Sheet";
        let stageInfo = "";
        
        if (type === "festival") {
            reportTitle = `Tabulation Sheet - ${title}`;
        } else if (type === "dateStage") {
            const [date, stage] = title.split(" - ");
            reportTitle = `Tabulation Sheet Tamil Kalaivizha - ${title}`;
            stageInfo = `
                <div class="stage-info">
                    <div><b>Stage No : ${stage}</b></div>
                    <div><b>Date : ${date}</b></div>
                    <div><b>Item : All Items</b></div>
                </div>
            `;
        } else if (type === "item") {
            const [festival, item] = title.split(" - ");
            reportTitle = `Tabulation Sheet ${festival} Tamil Kalaivizha - ${item}`;
            stageInfo = `
                <div class="stage-info">
                    <div><b>Stage No : Stage 1</b></div>
                    <div><b>Date : 27 Dec 2023</b></div>
                    <div><b>Item : ${item}</b></div>
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
                    <p>No of Participants Performed : 5</p>
                    <p>Highest Score : 85</p>
                </div>
                <div class="footer-signature">
                    <p>Signature of Tabulation Officer</p>
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
                .tabulation-sheet-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .tabulation-sheet-table th, .tabulation-sheet-table td {
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
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-4 md:p-6 mt-4 w-full overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4">Stage Report - Tabulation Sheet</h2>

                    <div className="space-y-6">
                        {/* Tabulation Sheet (Item) */}
                        <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Tabulation Sheet (Item)</h3>
                            <form onSubmit={handleAddTabulationSheet}>
                                <div className="flex justify-center">
                                    <div className="space-y-4 w-full max-w-md">
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Festival Type</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Festival"
                                                    value={itemTabulationSheet.Festival}
                                                    onChange={handleItemChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Festival</option>
                                                    <option value="UP">UP</option>
                                                    <option value="LP">LP</option>
                                                    <option value="HS">HS</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Item Name</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Item"
                                                    value={itemTabulationSheet.Item}
                                                    onChange={handleItemChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Item</option>
                                                    <option value="Drama">Drama</option>
                                                    <option value="Essay">Essay</option>
                                                    <option value="Story">Story</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">No of Participants</label>
                                            <div className="w-full md:w-80">
                                                <input 
                                                    type="text" 
                                                    name="NumberOfParticipants"
                                                    value={itemTabulationSheet.NumberOfParticipants}
                                                    onChange={handleItemChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full" 
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-6 md:mt-10">
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

                        {/* Tabulation Sheet (Festival Wise) */}
                        <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Tabulation Sheet (Festival Wise)</h3>
                            <form onSubmit={handleFestivalReport}>
                                <div className="flex justify-center">
                                    <div className="space-y-4 w-full max-w-md">
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Festival Type</label>
                                            <div className="w-full md:w-80">
                                                <select
                                                    name="Festival"
                                                    value={festivalTabulationSheet.Festival}
                                                    onChange={handleFestivalChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Festival</option>
                                                    <option value="UP">UP</option>
                                                    <option value="LP">LP</option>
                                                    <option value="HS">HS</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="text-center mt-6 md:mt-10">
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

                        {/* Tabulation Sheet (Date & Stage Wise) */}
                        <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Tabulation Sheet (Date & Stage Wise)</h3>
                            <form onSubmit={handleDateStageReport}>
                                <div className="flex justify-center">
                                    <div className="space-y-4 w-full max-w-md">
                                        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
                                            <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0">Date</label>
                                            <div className="w-full md:w-80">
                                                <input
                                                    type="date"
                                                    name="Date"
                                                    value={dateStageSheet.Date}
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
                                                    value={dateStageSheet.Stage}
                                                    onChange={handleDateStageChange}
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Stage</option>
                                                    <option value="Stage 1">Stage 1</option>
                                                    <option value="Stage 2">Stage 2</option>
                                                    <option value="Stage 3">Stage 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="text-center mt-6 md:mt-10">
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
        </>
    );
};


export default DTabulationSheet