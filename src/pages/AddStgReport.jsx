import React, { useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const AddStgReport = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [selectedSheet, setSelectedSheet] = useState('');
    const [selectedItemCode, setSelectedItemCode] = useState('');

    // Item code options
    const itemOptions = [
        { value: "201", label: "201 - drama" },
        { value: "203", label: "203 - essay" },
        { value: "300", label: "300 - writing" },
        { value: "301", label: "301 - Story Writing" }
    ];

    // Sample data for report preview
    const participantsData = [
        { slNo: 1, regNo: '17', name: 'Participant 1', gender: 'M', class: '10', school: 'ABC School' },
        { slNo: 2, regNo: '190', name: 'Participant 2', gender: 'F', class: '11', school: 'XYZ School' },
        { slNo: 3, regNo: '149', name: 'Participant 3', gender: 'M', class: '9', school: 'PQR School' },
        { slNo: 4, regNo: '301', name: 'Participant 4', gender: 'F', class: '12', school: 'LMN School' },
        { slNo: 5, regNo: '340', name: 'Participant 5', gender: 'M', class: '10', school: 'DEF School' },
    ];

    // Filter options based on search term
    const filteredOptions = itemOptions.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionSelect = (option) => {
        setSelectedOption(option.label);
        setSelectedItemCode(option.value);
        setSearchTerm(option.label);
        setShowOptions(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItemCode && selectedSheet) {
            // Instead of showing report in UI, print directly
            handlePrint();
        } else {
            alert("Please select both Item Code and Sheet");
        }
    };

    // Print functionality
    const handlePrint = () => {
        const originalContents = document.body.innerHTML;
        
        // Table for participants data
        let tableHTML = `
            <table border="1" cellpadding="8" cellspacing="0" class="participants-table">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>School</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Add real data if available, otherwise use empty rows
        if (participantsData && participantsData.length > 0) {
            participantsData.forEach(item => {
                tableHTML += `
                    <tr>
                        <td>${item.slNo}</td>
                        <td>${item.regNo}</td>
                        <td>${item.name}</td>
                        <td>${item.gender}</td>
                        <td>${item.class}</td>
                        <td>${item.school}</td>
                    </tr>
                `;
            });
        } else {
            // Empty rows for template
            for (let i = 0; i < 10; i++) {
                tableHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
            }
        }
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        // Create report title based on selected options
        const itemName = selectedOption || `${selectedItemCode} - ${itemOptions.find(o => o.value === selectedItemCode)?.label.split(' - ')[1] || ''}`;
        const reportTitle = `${selectedSheet} - ${itemName}`;
        
        // Header info
        const headerInfo = `
            <div class="header-info">
                <div class="info-box">
                    <div><b>Event: ${itemName}</b></div>
                    <div><b>Festival: UP Tamil Kalaivizha</b></div>
                    <div><b>Sheet Type: ${selectedSheet}</b></div>
                </div>
            </div>
        `;
        
        // Footer info
        const footerInfo = `
            <div class="footer-info">
                <div class="footer-item">
                    <p>No of Participants Registered: ${participantsData?.length || 10}</p>
                    <p>No of Participants Performed: </p>
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
                .info-box {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 5px 10px;
                }
                .participants-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .participants-table th, .participants-table td {
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
                        <h2 className="text-lg font-semibold mb-4">Stage Report - All Report</h2>

                        <div className="space-y-6">
                            {/* Report Selection Form */}
                            <div className="bg-gray-200 p-6 rounded-lg">
                                <h3 className="text-md font-semibold mb-4">All Report</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex justify-center">
                                        <div className="space-y-4">
                                            <div className="flex flex-col md:flex-row mb-8">
                                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Code</label>
                                                <div className="w-full md:w-80 relative">
                                                    <input
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={(e) => {
                                                            setSearchTerm(e.target.value);
                                                            setShowOptions(true);
                                                        }}
                                                        onClick={() => setShowOptions(true)}
                                                        placeholder="Search item code"
                                                        className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    />
                                                    {showOptions && (
                                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                            {filteredOptions.length > 0 ? (
                                                                filteredOptions.map((option, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                                        onClick={() => handleOptionSelect(option)}
                                                                    >
                                                                        {option.label}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="px-4 py-2 text-gray-500">No options found</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row mb-8">
                                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Sheet</label>
                                                <div className="w-full md:w-80">
                                                    <select
                                                        name="Item"
                                                        className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                        required
                                                        value={selectedSheet}
                                                        onChange={(e) => setSelectedSheet(e.target.value)}
                                                    >
                                                        <option value="">Select Sheet </option>
                                                        <option value="Call Sheet">Call Sheet</option>
                                                        <option value="Score Sheet">Score Sheet</option>
                                                        <option value="Time Sheet">Time Sheet</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='text-center mt-10'>
                                                <button
                                                    type="submit"
                                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
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
    )
}

export default AddStgReport