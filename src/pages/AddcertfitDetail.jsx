import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js'
// import { getAllCertificateDetailsAPI, generateCertificateDetailsAPI } from '../services/allAPI'

const AddcertfitDetail = () => {
    const [searchParams] = useSearchParams();
    const schoolName = searchParams.get('school') || "School Name";
    
    const [selectedFestival, setSelectedFestival] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedParticipant, setSelectedParticipant] = useState("");
    const [selectedGroupParticipant, setSelectedGroupParticipant] = useState("");
    const [showCertificate, setShowCertificate] = useState(false);
    const [certificateData, setCertificateData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const certificateRef = useRef(null);
    
    const festivalTypes = [
        { value: "", label: "Select Festival" },
        { value: "UP Kalaivizha", label: "UP Kalaivizha" },
        { value: "LP Kalaivizha", label: "LP Kalaivizha" },
        { value: "HS Kalaivizha", label: "HS Kalaivizha" },
        { value: "HSS Kalaivizha", label: "HSS Kalaivizha" },
        { value: "All Festival", label: "All Festival" },
    ];

    const itemNames = [
        { value: "", label: "Select Item" },
        { value: "303 - Drama", label: "303 - Drama" },
        { value: "301 - Story Writing", label: "301 - Story Writing" },
        { value: "304 - Essay Writing", label: "304 - Essay Writing" },
        { value: "All Item", label: "All Item" },
    ];

    const participantOptions = [
        { value: "", label: "Select Participant" },
        { value: "Anu", label: "Anu" },
        { value: "Binu", label: "Binu" },
        { value: "Cinu", label: "Cinu" },
        { value: "All Participants", label: "All Participants" }
    ];

    const groupParticipantOptions = [
        { value: "", label: "Select Group Participant" },
        { value: "1 - Ramesh", label: "1 - Ramesh" },
        { value: "2 - Vijayalakshmi", label: "2 - Vijayalakshmi" },
        { value: "3 - Suresh", label: "3 - Suresh" },
    ];

    // Trigger PDF generation when certificate data is ready and shown
    useEffect(() => {
        if (showCertificate && certificateData) {
            // Give time for the certificate to render
            const timer = setTimeout(() => {
                handleSaveAsPDF();
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [showCertificate, certificateData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSaveSuccess(false);
        
        if (selectedFestival && selectedItem) {
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                
                try {
                    // Create request payload
                    const requestData = {
                        festival: selectedFestival,
                        item: selectedItem,
                        participant: selectedParticipant,
                        groupParticipant: selectedGroupParticipant,
                        school: schoolName
                    };
                    
                    // Call API to generate certificate details
                    // const result = await generateCertificateDetailsAPI(requestData, reqHeader);
                    
                    // if (result.status === 200) {
                    //     setCertificateData(result.data);
                    //     setShowCertificate(true);
                    // } else {
                    //     console.log("Failed to generate certificate details");
                    //     setError("Failed to generate certificate details");
                    // }
                    
                    // Fallback to static data until API is implemented
                    provideFallbackData();
                } catch (err) {
                    console.log(err);
                    setError("Failed to generate certificate details. Please try again.");
                    // Fallback to static data to demonstrate functionality
                    provideFallbackData();
                }
            } else {
                // If no token, fallback to static data for demo
                provideFallbackData();
            }
        } else {
            setError("Please select Festival and Item");
            setIsLoading(false);
        }
    };

    // Fallback function to provide static data when API fails
    const provideFallbackData = () => {
        if (selectedParticipant === "All Participants") {
            // Generate certificates for all participants
            setCertificateData([
                {
                    name: "Anu",
                    regNo: "1",
                    festival: selectedFestival,
                    item: selectedItem,
                    school: schoolName,
                    class: "10",
                    grade: "A"
                },
                {
                    name: "Binu",
                    regNo: "2",
                    festival: selectedFestival,
                    item: selectedItem,
                    school: schoolName,
                    class: "11",
                    grade: "A"
                },
                {
                    name: "Cinu",
                    regNo: "3",
                    festival: selectedFestival,
                    item: selectedItem,
                    school: schoolName,
                    class: "12",
                    grade: "B"
                }
            ]);
        } else {
            // Generate certificate for selected participant
            setCertificateData([
                {
                    name: selectedParticipant || "Default Participant",
                    regNo: selectedParticipant === "Anu" ? "1" : 
                           selectedParticipant === "Binu" ? "2" : 
                           selectedParticipant === "Cinu" ? "3" : "0",
                    festival: selectedFestival,
                    item: selectedItem,
                    school: schoolName,
                    class: selectedParticipant === "Anu" ? "10" : 
                            selectedParticipant === "Binu" ? "11" : 
                            selectedParticipant === "Cinu" ? "12" : "N/A",
                    grade: selectedParticipant === "Cinu" ? "B" : "A"
                }
            ]);
        }
        
        setShowCertificate(true);
        setIsLoading(false);
    };

    const handleBackToSelection = () => {
        setShowCertificate(false);
        setCertificateData(null);
        setError(null);
        setSaveSuccess(false);
    };

    // Function to generate PDF and handle save as
    const handleSaveAsPDF = async () => {
        if (!certificateRef.current) return;
        
        try {
            setIsLoading(true);
            
            const filename = selectedParticipant === "All Participants" 
                ? `${schoolName}-${selectedFestival}-${selectedItem}-all-certificates.pdf`
                : `${schoolName}-${selectedParticipant || "certificate"}.pdf`;
                
            // Generate PDF first
            const options = {
                margin: 10,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // If multiple certificates, ensure they all fit well
            if (certificateData && certificateData.length > 1) {
                options.pagebreak = { mode: ['avoid-all', 'css', 'legacy'] };
            }
            
            // Generate PDF blob
            const pdfBlob = await html2pdf()
                .set(options)
                .from(certificateRef.current)
                .output('blob');
            
            // Check if browser supports the File System Access API
            if ('showSaveFilePicker' in window) {
                try {
                    // File picker options
                    const opts = {
                        suggestedName: filename,
                        types: [{
                            description: 'PDF Files',
                            accept: {'application/pdf': ['.pdf']}
                        }],
                    };
                    
                    // Show the file picker
                    const fileHandle = await window.showSaveFilePicker(opts);
                    
                    // Create a FileSystemWritableFileStream
                    const writable = await fileHandle.createWritable();
                    
                    // Write the blob to the file
                    await writable.write(pdfBlob);
                    
                    // Close the file
                    await writable.close();
                    
                    // Show success message
                    setSaveSuccess(true);
                    
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error("Error saving file:", err);
                        // Fall back to regular download if there's an error other than user cancellation
                        downloadPDF(pdfBlob, filename);
                        setSaveSuccess(true);
                    }
                }
            } else {
                // Fall back to regular download if File System Access API is not supported
                downloadPDF(pdfBlob, filename);
                setSaveSuccess(true);
            }
        } catch (err) {
            console.error("Error generating or saving PDF:", err);
            setError("Failed to save PDF. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Fallback download function using URL.createObjectURL
    const downloadPDF = (blob, filename) => {
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        
        // Append to the document
        document.body.appendChild(link);
        
        // Trigger click
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    return (
        <>
            <div>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                    <Dash />
                    <div className="flex-1 p-2 w-full overflow-x-auto">
                        {/* Report Selection Form or Certificate Display */}
                        <div className="bg-gray-200 p-4 rounded-lg min-h-screen">
                            {!showCertificate ? (
                                <>
                                    <h2 className="text-lg font-semibold mb-4">{schoolName} - Certificate Details</h2>
                                    
                                    {/* Display error message if exists */}
                                    {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                            {error}
                                        </div>
                                    )}
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex justify-center mt-8 md:mt-28">
                                            <div className="space-y-4 w-full max-w-xl">
                                                <div className="flex flex-col md:flex-row mb-6">
                                                    <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Festival Type</label>
                                                    <div className="w-full md:ml-4 lg:ml-12 md:w-80 relative">
                                                        <select
                                                            name="festivalType"
                                                            className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                            required
                                                            value={selectedFestival}
                                                            onChange={(e) => setSelectedFestival(e.target.value)}
                                                        >
                                                            {festivalTypes.map((festival) => (
                                                                <option key={festival.value} value={festival.value}>
                                                                    {festival.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:flex-row mb-6">
                                                    <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Item Name</label>
                                                    <div className="w-full md:ml-4 lg:ml-12 md:w-80">
                                                        <select
                                                            name="itemName"
                                                            className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                            required
                                                            value={selectedItem}
                                                            onChange={(e) => setSelectedItem(e.target.value)}
                                                        >
                                                            {itemNames.map((item) => (
                                                                <option key={item.value} value={item.value}>
                                                                    {item.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:flex-row mb-6">
                                                    <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Participant / Captain</label>
                                                    <div className="w-full md:ml-4 lg:ml-12 md:w-80">
                                                        <select
                                                            name="participantCaptain"
                                                            className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                            value={selectedParticipant}
                                                            onChange={(e) => setSelectedParticipant(e.target.value)}
                                                        >
                                                            {participantOptions.map((participant) => (
                                                                <option key={participant.value} value={participant.value}>
                                                                    {participant.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:flex-row mb-6">
                                                    <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Participant (Group / Pinnany)</label>
                                                    <div className="w-full md:ml-4 lg:ml-12 md:w-80">
                                                        <select
                                                            name="groupParticipant"
                                                            className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                            value={selectedGroupParticipant}
                                                            onChange={(e) => setSelectedGroupParticipant(e.target.value)}
                                                        >
                                                            {groupParticipantOptions.map((groupParticipant) => (
                                                                <option key={groupParticipant.value} value={groupParticipant.value}>
                                                                    {groupParticipant.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="text-center mt-6 md:mt-10">
                                                    <button
                                                        type="submit"
                                                        className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-8 md:px-14 py-2 md:py-3 rounded-full"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? 'Generating...' : 'Generate'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex flex-col">
                                    {/* Display success message when save is successful */}
                                    {saveSuccess && (
                                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
                                            <span>Certificate saved successfully!</span>
                                            <button 
                                                onClick={() => setSaveSuccess(false)}
                                                className="text-green-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    
                                    {/* Display error message if exists */}
                                    {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                            {error}
                                        </div>
                                    )}
                                    
                                    {/* Back button */}
                                    <div className="mb-4">
                                        <button
                                            onClick={handleBackToSelection}
                                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded flex items-center"
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="16" 
                                                height="16" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                className="mr-2"
                                            >
                                                <path d="m15 18-6-6 6-6"/>
                                            </svg>
                                            Back
                                        </button>
                                    </div>
                                    
                                    {/* Certificate content */}
                                    <div ref={certificateRef} className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
                                        {/* Certificate Title */}
                                        <h1 className="text-xl font-bold text-center mb-6">Certificate Details Report</h1>
                                        
                                        {/* Certificate Data */}
                                        {certificateData && certificateData.map((participant, index) => (
                                            <div key={index} className="mb-8">
                                                <div className="mb-6 px-4 flex justify-center">
                                                    <div className="grid gap-y-2 text-left">
                                                        <div className="flex">
                                                            <span className="w-32 font-semibold">Name:</span>
                                                            <span>{participant.name}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-32 font-semibold">Reg No:</span>
                                                            <span>{participant.regNo}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-32 font-semibold">School:</span>
                                                            <span>{participant.school}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-32 font-semibold">Class:</span>
                                                            <span>{participant.class}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-32 font-semibold">Festival:</span>
                                                            <span>{participant.festival}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-32 font-semibold">Item:</span>
                                                            <span>{participant.item}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-32 font-semibold">Grade:</span>
                                                            <span>{participant.grade}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index < certificateData.length - 1 && <hr className="my-6" />}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Loading overlay */}
                                    {isLoading && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                            <div className="bg-white p-5 rounded-lg flex flex-col items-center">
                                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-3"></div>
                                                <p>Saving certificate...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddcertfitDetail