import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllHigherlvlcompAPI } from '../services/allAPI';

const Higherlvlcomp = () => {
    const [Allitemresult, setItemresult] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const [festivalOptions, setFestivalOptions] = useState([]);

    // Festival mapping with codes and names
    const festivalMapping = {
        "UP Kalaivizha": { min: 300, max: 399 },
        "LP Kalaivizha": { min: 400, max: 499 },
        "HS Kalaivizha": { min: 500, max: 599 },
        "HSS Kalaivizha": { min: 600, max: 899 },
    };

    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";

    useEffect(() => {
        getAllItemResult();
    }, []);

    useEffect(() => {
        if (Allitemresult.length > 0) {
            // Generate festival options from the actual data
            generateFestivalOptions();
            filterItemsByFestival(selectedFestival);
        }
    }, [selectedFestival, Allitemresult]);

    // Generate festival options based on data
    const generateFestivalOptions = () => {
        const festivals = new Set();

        // Add "All Festival" option by default
        festivals.add("All Festival");

        // Add festivals based on item codes in the data
        Allitemresult.forEach(item => {
            const itemCode = parseInt(item.itemCode);

            Object.entries(festivalMapping).forEach(([festival, range]) => {
                if (itemCode >= range.min && itemCode <= range.max) {
                    festivals.add(festival);
                }
            });
        });

        setFestivalOptions(Array.from(festivals));
    };

    const getAllItemResult = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllHigherlvlcompAPI(reqHeader)
                if (result.status === 200) {
                    setItemresult(result.data);
                }
            } catch (err) {
                console.log(err);
                setItemresult(resultData);
                generateFestivalOptionsFromDummy();
            }
        } else {
            setItemresult(resultData);
            generateFestivalOptionsFromDummy();
        }
    }

    // Generate festival options from dummy data when API fails
    const generateFestivalOptionsFromDummy = () => {
        const festivals = new Set();

        // Add "All Festival" option by default
        festivals.add("All Festival");

        // Add festivals based on item codes in dummy data
        resultData.forEach(item => {
            const itemCode = parseInt(item.itemCode);

            Object.entries(festivalMapping).forEach(([festival, range]) => {
                if (itemCode >= range.min && itemCode <= range.max) {
                    festivals.add(festival);
                }
            });
        });

        setFestivalOptions(Array.from(festivals));
    };

    const filterItemsByFestival = (festival) => {
        if (!Allitemresult.length) return;

        let filtered;
        if (festival === "All Festival") {
            filtered = [...Allitemresult];
        } else {
            const range = festivalMapping[festival];
            filtered = Allitemresult.filter(item => {
                const itemCode = parseInt(item.itemCode);
                return itemCode >= range.min && itemCode <= range.max;
            });
        }

        // Add sequential numbering to filtered results
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredItems(filtered);
    }


    const resultData = [
        {
            slNo: 1,
            itemCode: "301",
            itemName: "Story Writing",
            participantName: "Arun Kumar",
            class: "10th A",
            schoolName: "St. Joseph's High School"
        },
        {
            slNo: 2,
            itemCode: "302",
            itemName: "Poem Recitation",
            participantName: "Meena Sharma",
            class: "9th B",
            schoolName: "Holy Cross School"
        },
        {
            slNo: 3,
            itemCode: "401",
            itemName: "LP Essay Writing",
            participantName: "Rajesh Singh",
            class: "5th C",
            schoolName: "Kendriya Vidyalaya"
        },
        {
            slNo: 4,
            itemCode: "402",
            itemName: "LP Tamil Elocution",
            participantName: "Priya Raman",
            class: "4th A",
            schoolName: "Government Higher Secondary School"
        },
        {
            slNo: 5,
            itemCode: "501",
            itemName: "HS Group Singing",
            participantName: "Tamil Music Team",
            class: "Various",
            schoolName: "Modern Public School"
        },
        {
            slNo: 6,
            itemCode: "502",
            itemName: "HS Mono Acting",
            participantName: "Karthik Narayanan",
            class: "10th D",
            schoolName: "DAV Public School"
        },
        {
            slNo: 7,
            itemCode: "601",
            itemName: "HSS Kolam Competition",
            participantName: "Lakshmi Sundaram",
            class: "12th A",
            schoolName: "St. Mary's School"
        },
        {
            slNo: 8,
            itemCode: "602",
            itemName: "HSS Folk Dance",
            participantName: "Cultural Team",
            class: "Various",
            schoolName: "Vidya Mandir"
        }
    ];

    const getPrintTitle = () => {
        switch (selectedFestival) {
            case "UP Kalaivizha":
                return "UP Tamil Kalaivizha - Higher Level Competition";
            case "LP Kalaivizha":
                return "LP Tamil Kalaivizha - Higher Level Competition";
            case "HS Kalaivizha":
                return "HS Tamil Kalaivizha - Higher Level Competition";
            case "HSS Kalaivizha":
                return "HSS Tamil Kalaivizha - Higher Level Competition";
            case "All Festival":
                return "All Festival Tamil Kalaivizha - Higher Level Competition";
            default:
                return "Higher Level Competition";
        }
    };

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSearchParams({ festival });
    };

    const handlePrint = () => {
        const printContent = document.getElementById('higher-level-table-container');

        const printWindow = window.open('', '_blank');
        printWindow.document.open();

        printWindow.document.write(`
            <html>
            <head>
                <title>${getPrintTitle()}</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; }
                    h2 { text-align: center; margin-bottom: 20px; }

                    /* Media query for print styles */
                    @media print {
                        @page { size: portrait; /* Use portrait for mobile */ }
                        th, td { font-size: 10px; padding: 6px; } /* Adjust font and padding */
                        /* You might need to adjust column widths or hide some columns for better mobile print */
                    }
                </style>
            </head>
            <body>
                <h2>${getPrintTitle()}</h2>
                ${printContent.innerHTML}
            </body>
            </html>
        `);

        printWindow.document.close();

        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };


    const displayData = filteredItems.length > 0 ? filteredItems :
        (Allitemresult.length > 0 ? Allitemresult : resultData);


    useEffect(() => {
        if (Allitemresult.length === 0 && resultData.length > 0) {
            setItemresult(resultData);
            generateFestivalOptionsFromDummy();
            filterItemsByFestival(selectedFestival);
        }
    }, []);

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Higher Level Competition
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    {festivalOptions.map((festival) => (
                                        <option key={festival} value={festival}>
                                            {festival}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            <button
                                onClick={handlePrint}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                            >
                                Print
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div id="higher-level-table-container" className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name of Participant</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Class</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {displayData.length > 0 ? (
                                                displayData.map((result) => (
                                                    <tr key={result.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode} - {result.itemName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.participantName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.class}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="p-4 text-center">
                                                        No items found for {selectedFestival}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Higherlvlcomp