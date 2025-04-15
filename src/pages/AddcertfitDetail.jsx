import React, { useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js'

const AddcertfitDetail = () => {
    const [searchParams] = useSearchParams();
    const schoolName = searchParams.get('school') || "School Name";
    
    const [selectedFestival, setSelectedFestival] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedParticipant, setSelectedParticipant] = useState("");
    const [selectedGroupParticipant, setSelectedGroupParticipant] = useState("");
    const [showCertificate, setShowCertificate] = useState(false);
    const [certificateData, setCertificateData] = useState(null);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Generate certificate data based on form selections
        if (selectedFestival && selectedItem) {
            // Create certificate data based on form selections
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
                        name: selectedParticipant,
                        regNo: selectedParticipant === "Anu" ? "1" : 
                               selectedParticipant === "Binu" ? "2" : "3",
                        festival: selectedFestival,
                        item: selectedItem,
                        school: schoolName,
                        class: selectedParticipant === "Anu" ? "10" : 
                                selectedParticipant === "Binu" ? "11" : "12",
                        grade: selectedParticipant === "Cinu" ? "B" : "A"
                    }
                ]);
            }
            
            setShowCertificate(true);
        }
    };

    const handleBackToSelection = () => {
        setShowCertificate(false);
        setCertificateData(null);
    };

    const handleDownloadPDF = () => {
        if (!certificateRef.current) return;
        
        const element = certificateRef.current;
        const filename = selectedParticipant === "All Participants" 
            ? `${schoolName}-${selectedFestival}-${selectedItem}-all-certificates.pdf`
            : `${schoolName}-${selectedParticipant}-certificate.pdf`;
            
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
        
        html2pdf().set(options).from(element).save();
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
                                                            required
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
                                                    >
                                                        Generate
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
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
                                    
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <button
                                            onClick={handleBackToSelection}
                                            className="border border-blue-500 text-blue-700 px-8 py-2 rounded-full"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleDownloadPDF}
                                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-8 py-2 rounded-full"
                                        >
                                            Download PDF
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddcertfitDetail