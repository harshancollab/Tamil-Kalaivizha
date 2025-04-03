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
            setShowReport(true);
        } else {
            alert("Please select both Item Code and Sheet");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 mt-4 w-full overflow-x-auto">
                        <h2 className="text-lg font-semibold mb-4">Stage Report - All Report</h2>

                        {!showReport ? (
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
                        ) : (
                            <div className="space-y-6">
                                {/* Report Display */}
                                <div className="bg-white p-6 rounded-lg shadow-md print:shadow-none">
                                    <div className="flex justify-between items-center mb-6 print:mb-8">
                                        <h2 className="text-xl font-bold">Participants List</h2>
                                        <button 
                                            onClick={handlePrint}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-full print:hidden"
                                        >
                                            Print
                                        </button>
                                    </div>

                                    <div className="text-center mb-4 border-2 border-gray-300 rounded-md p-4">
                                        <h3 className="text-lg font-semibold">
                                            {selectedItemCode === "301" ? "301 - Story Writing" : selectedOption} | Festival: UP Tamil Kalaivizha
                                        </h3>
                                    </div>
                                    
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-center">Sl No</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center">Reg No</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center">Gender</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center">Class</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center">School</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Empty rows for the template */}
                                                {[...Array(10)].map((_, index) => (
                                                    <tr key={index}>
                                                        <td className=" px-4 py-2 text-center">{index + 1}</td>
                                                        <td className="border-x border-gray-300 px-4 py-2 text-center"></td>
                                                        <td className="border-x border-gray-300 px-4 py-2"></td>
                                                        <td className="border-x border-gray-300 px-4 py-2 text-center"></td>
                                                        <td className="border-x border-gray-300 px-4 py-2 text-center"></td>
                                                        <td className="border-x border-gray-300 px-4 py-2"></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-6 print:hidden">
                                        <button 
                                            onClick={() => setShowReport(false)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-full mr-4"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Print-specific styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: visible;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }
                    .print\\:mb-8 {
                        margin-bottom: 2rem !important;
                    }
                    header, nav, .sidebar, .no-print {
                        display: none !important;
                    }
                    .overflow-x-auto {
                        overflow: visible !important;
                    }
                    table {
                        page-break-inside: auto;
                    }
                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }
                    thead {
                        display: table-header-group;
                    }
                }
            `}</style>
        </>
    )
}

export default AddStgReport