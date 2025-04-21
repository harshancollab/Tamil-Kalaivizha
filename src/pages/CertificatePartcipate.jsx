import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import html2pdf from 'html2pdf.js';
import { useSearchParams } from 'react-router-dom';

const CertificateParticipate = () => {
  // Add useSearchParams to get item information from URL
  const [searchParams] = useSearchParams();
  const itemCode = searchParams.get('itemCode');
  const itemName = searchParams.get('itemName');
  const festival = searchParams.get('festival') || "All Festival";

  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const dropdownRef = useRef(null);
  const certificateRef = useRef(null);
  const searchInputRef = useRef(null);

  // Dummy data for participants
  const dummyParticipants = [
    {
      id: 1,
      name: "Vijayalakshmi",
      regNo: "2",
      school: "G. H. S. S. Kumily",
      class: "11",
      item: "Light Music",
      grade: "A"
    },
    {
      id: 2,
      name: "Jothika",
      regNo: "24",
      school: "G. H. S. S. Kumily",
      class: "11",
      item: "Story Writing",
      grade: "A"
    },
    {
      id: 3,
      name: "Rajesh",
      regNo: "3",
      school: "G. H. S. S. Anakara",
      class: "10",
      item: "Classical Music",
      grade: "B"
    },
    {
      id: 4,
      name: "Priya",
      regNo: "4",
      school: "G. H. S. S. Kumily",
      class: "12",
      item: "Vocal Music",
      grade: "A"
    },
    {
      id: 5,
      name: "Amit",
      regNo: "5",
      school: "G. H. S. S. Anakara",
      class: "9",
      item: "Western Music",
      grade: "A"
    },
    {
      id: 6,
      name: "Sneha",
      regNo: "6",
      school: "G. H. S. S. Kumily",
      class: "11",
      item: "Folk Music",
      grade: "B"
    },
    {
      id: 7,
      name: "Rahul",
      regNo: "7",
      school: "G. H. S. S. Anakara",
      class: "12",
      item: "Instrumental Music",
      grade: "A"
    },
    {
      id: 8,
      name: "Divya",
      regNo: "8",
      school: "G. H. S. S. Kumily",
      class: "10",
      item: "Group Song",
      grade: "A"
    },
    { id: "all", name: "All Participants" }
  ];

  const [participants, setParticipants] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Simulate API call to get participants
  useEffect(() => {
    getAllParticipants();
  }, []);

  // Check if search bar should be shown based on participant count
  useEffect(() => {
    // Show search bar if there are more than 7 participants
    setShowSearchBar(participants.length > 7);
    
    // Initialize filtered participants with all participants
    setFilteredParticipants(participants);
  }, [participants]);

  // Filter participants when search term changes
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const filtered = participants.filter(participant => {
        // Always include "All Participants" option at the top
        if (participant.id === "all") return false; // Remove from filtered results when searching
        
        // Search by name, regNo or school - make search case-insensitive
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = participant.name?.toLowerCase().includes(searchLower);
        const regNoMatch = participant.regNo?.toString().includes(searchLower);
        const schoolMatch = participant.school?.toLowerCase().includes(searchLower);
        
        return nameMatch || regNoMatch || schoolMatch;
      });
      
      // Only add "All Participants" option if we're not searching or if there are results
      setFilteredParticipants(filtered);
    } else {
      setFilteredParticipants(participants);
    }
  }, [searchTerm, participants]);

  // Focus search input when dropdown opens and search bar is visible
  useEffect(() => {
    if (isDropdownOpen && showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen, showSearchBar]);

  // Reset highlighted index when dropdown opens/closes
  useEffect(() => {
    if (isDropdownOpen) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(-1);
      // Clear search when closing dropdown
      setSearchTerm('');
    }
  }, [isDropdownOpen]);

  // Scroll to highlighted item
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

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

  // Simulate API call to get all participants
  const getAllParticipants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use dummy data
      // If itemCode is provided, filter participants to match that item if needed
      // This is where you could make an API call to get participants for a specific item
      setParticipants(dummyParticipants);
    } catch (err) {
      console.log(err);
      setError("Failed to load participants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Simulate API call to get participant by ID
  const getParticipantById = async (participantId) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find in dummy data
      const participant = dummyParticipants.find(p => p.id.toString() === participantId.toString());
      return participant || null;
    } catch (err) {
      console.log(err);
      setError(`Failed to load participant ${participantId}. Please try again.`);
      return null;
    }
  };

  const handleParticipantSelect = (participant) => {
    if (participant.id === "all") {
      setSelectedParticipant("All Participants");
    } else {
      setSelectedParticipant(`${participant.id} - ${participant.name}`);
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyDown = (e) => {
    if (!isDropdownOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        setIsDropdownOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredParticipants.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredParticipants[highlightedIndex]) {
          handleParticipantSelect(filteredParticipants[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Reset highlighted index when search changes
    setHighlightedIndex(0);
  };

  const handleSearchKeyDown = (e) => {
    // Prevent closing dropdown when typing in search
    e.stopPropagation();
    
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(0);
    }
  };

  const handleGenerateCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    
    if (selectedParticipant) {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (selectedParticipant === "All Participants") {
          // Get all participants excluding the "All Participants" option
          const allParticipantsData = participants.filter(p => p.id !== "all");
          setCertificateData(allParticipantsData);
        } else {
          // Find the selected participant in the array
          const participantId = selectedParticipant.split(' - ')[0];
          const participantDetails = await getParticipantById(participantId);
          
          if (participantDetails) {
            setCertificateData([participantDetails]);
          } else {
            setError("Participant not found. Please try again.");
            setLoading(false);
            return;
          }
        }
        setShowCertificate(true);
        // handleSaveAsPDF will be called automatically via useEffect
        
      } catch (err) {
        console.error("Error generating certificate:", err);
        setError("Failed to generate certificate. Please try again.");
        setLoading(false);
      }
    } else {
      setError("Please select a participant first.");
      setLoading(false);
    }
  };

  // Function to generate PDF and handle save as
  const handleSaveAsPDF = async () => {
    if (!certificateRef.current) return;
    
    try {
      setLoading(true);
      
      const filename = selectedParticipant === "All Participants" 
        ? `all-participants-${itemCode ? itemCode + '-' + itemName : ''}-certificate.pdf`
        : `${selectedParticipant.split(' - ')[1]}-${itemCode ? itemCode + '-' + itemName : ''}-certificate.pdf`;
      
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
      setLoading(false);
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

  const handleBackToSelection = () => {
    setShowCertificate(false);
    setCertificateData(null);
    setError(null);
    setSaveSuccess(false);
  };

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
          <Dash />
          <div className="flex-1 p-4 md:p-2 w-full overflow-x-auto">
            <div className="bg-gray-200 p-4 rounded-lg min-h-screen">
              {!showCertificate ? (
                <>
                  <h2 className="text-lg font-semibold mb-4">Certificate Participant Wise</h2>
                  
                  {/* Display Item Code & Item Name if available */}
                  {itemCode && itemName && (
                    <div className="mb-4 p-3 rounded-lg">
                      <div className="flex flex-col sm:flex-row text-blue-900 sm:items-center">
                       
                        <div>{itemCode} - {itemName}</div>
                      </div>
                      
                    </div>
                  )}
                  
                  {/* Display error message if exists */}
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleGenerateCertificate}>
                    <div className="flex justify-center mt-20">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row mb-8">
                          <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">
                            Participant
                          </label>
                          <div className="w-full md:w-80 relative">
                            <div className="relative">
                              <input
                                placeholder={loading ? 'Loading participants...' : 'Select Participant'}
                                type="text"
                                className="border border-blue-600 px-2 py-1 rounded-full w-full cursor-pointer pr-8"
                                value={selectedParticipant}
                                onClick={toggleDropdown}
                                onKeyDown={handleKeyDown}
                                readOnly
                                disabled={loading}
                                aria-haspopup="listbox"
                                aria-expanded={isDropdownOpen}
                              />
                              <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={toggleDropdown}
                              >
                                {isDropdownOpen ? (
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
                                  >
                                    <path d="m18 15-6-6-6 6" />
                                  </svg>
                                ) : (
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
                                  >
                                    <path d="m6 9 6 6 6-6" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            {isDropdownOpen && (
                              <div
                                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                                role="listbox"
                                ref={dropdownRef}
                              >
                                {/* Search bar when participants > 7 */}
                                {showSearchBar && (
                                  <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                                    <div className="relative">
                                      <input
                                        ref={searchInputRef}
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 pl-8"
                                        placeholder="Search participants..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        onKeyDown={handleSearchKeyDown}
                                        onClick={e => e.stopPropagation()}
                                      />
                                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
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
                                        >
                                          <circle cx="11" cy="11" r="8" />
                                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                      </div>
                                      {searchTerm.trim() !== '' && (
                                        <div 
                                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                          onClick={() => setSearchTerm('')}
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
                                          >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {/* "All Participants" option always at the top when not searching */}
                                {searchTerm.trim() === '' && participants.find(p => p.id === "all") && (
                                  <div
                                    key="all"
                                    className={`px-4 py-2 cursor-pointer ${
                                      0 === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'
                                    } font-semibold border-b border-gray-200`}
                                    onClick={() => handleParticipantSelect(participants.find(p => p.id === "all"))}
                                    role="option"
                                    aria-selected={0 === highlightedIndex}
                                  >
                                    All Participants
                                  </div>
                                )}
                                
                                {/* Regular participants list */}
                                {filteredParticipants.length > 0 ? (
                                  filteredParticipants.map((participant, index) => {
                                    // Skip "All Participants" since we're handling it separately above
                                    if (participant.id === "all") return null;
                                    
                                    // Calculate the proper index for highlighting (account for "All Participants" at top)
                                    const highlightIndex = searchTerm.trim() === '' ? index + 1 : index;
                                    
                                    return (
                                      <div
                                        key={participant.id}
                                        className={`px-4 py-2 cursor-pointer ${
                                          highlightIndex === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'
                                        }`}
                                        onClick={() => handleParticipantSelect(participant)}
                                        role="option"
                                        aria-selected={highlightIndex === highlightedIndex}
                                      >
                                        {`${participant.id} - ${participant.name}`}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="px-4 py-2 text-gray-500">
                                    {searchTerm.trim() !== '' ? "No matching participants found" : "No participants available"}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='text-center'>
                          <button
                            type="submit"
                            className={`bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                          >
                            {loading ? 'Processing...' : 'Generate'}
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
                        className="text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
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
                    <h1 className="text-xl font-bold text-center mb-6">Certificate Participant Wise Report</h1>
                    
                    {/* Display Item Code & Item Name in the Certificate */}
                    {itemCode && itemName && (
                      <div className="mb-6 text-center">
                        <div className="text-lg font-semibold">
                          Item: {itemCode} - {itemName}
                        </div>
                        <div className="text-md text-gray-700">
                          Festival: {festival}
                        </div>
                      </div>
                    )}
                    
                    {certificateData && certificateData.map((participant, index) => (
                      <div key={participant.id} className="mb-8">
                        <div className="mb-6 px-16">
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
                                <span className="w-32 font-semibold">Item:</span>
                                <span>{participant.item}</span>
                              </div>
                              <div className="flex">
                                <span className="w-32 font-semibold">Grade:</span>
                                <span>{participant.grade}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < certificateData.length - 1 && <hr className="my-6" />}
                      </div>
                    ))}
                  </div>
                  
                  {/* Loading overlay */}
                  {loading && (
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

export default CertificateParticipate;