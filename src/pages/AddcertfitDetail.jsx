import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js'
// import { getAllCertificateDetailsAPI, generateCertificateDetailsAPI } from '../services/allAPI'

// Reusable SearchableDropdown component
const SearchableDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  label, 
  showSearch = false 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options when search term changes
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const filtered = options.filter(option => {
        // Search by label - case-insensitive
        const searchLower = searchTerm.toLowerCase();
        return option.label.toLowerCase().includes(searchLower);
      });
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen, showSearch]);

  // Reset highlighted index when dropdown opens/closes
  useEffect(() => {
    if (isDropdownOpen) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(-1);
      setSearchTerm('');
    }
  }, [isDropdownOpen]);

  // Scroll to highlighted item
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex + (showSearch ? 1 : 0)];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex, showSearch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    onChange(option.value);
    setIsDropdownOpen(false);
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
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
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
    setHighlightedIndex(0);
  };

  const handleSearchKeyDown = (e) => {
    e.stopPropagation();
    
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(0);
    }
  };

  // Find the label to display for the current value
  const selectedLabel = options.find(option => option.value === value)?.label || value || '';

  return (
    <div className="flex flex-col md:flex-row mb-6">
      <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">{label}</label>
      <div className="w-full md:ml-4 lg:ml-12 md:w-80 relative">
        <div className="relative">
          <input
            placeholder={placeholder || "Select..."}
            type="text"
            className="border border-blue-600 px-2 py-1 rounded-full w-full cursor-pointer pr-8"
            value={selectedLabel}
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            readOnly
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
            {/* Search bar when showSearch is true */}
            {showSearch && (
              <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pl-8"
                    placeholder="Search..."
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
            
            {/* Options list */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer ${
                    index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  aria-selected={index === highlightedIndex}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">
                No matching options found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

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
        { value: "304 - Essay Writing", label: "304 - Essay Writing" },
        { value: "304 - Essay Writing", label: "304 - Essay Writing" },
        { value: "304 - Essay Writing", label: "304 - Essay Writing" },
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
                                                {/* Festival Type with SearchableDropdown */}
                                                <SearchableDropdown 
                                                    options={festivalTypes}
                                                    value={selectedFestival}
                                                    onChange={setSelectedFestival}
                                                    placeholder="Select Festival"
                                                    label="Festival Type"
                                                    showSearch={festivalTypes.length > 7}
                                                />

                                                {/* Item Name with SearchableDropdown */}
                                                <SearchableDropdown 
                                                    options={itemNames}
                                                    value={selectedItem}
                                                    onChange={setSelectedItem}
                                                    placeholder="Select Item"
                                                    label="Item Name"
                                                    showSearch={itemNames.length > 7}
                                                />

                                                {/* Participant with SearchableDropdown */}
                                                <SearchableDropdown 
                                                    options={participantOptions}
                                                    value={selectedParticipant}
                                                    onChange={setSelectedParticipant}
                                                    placeholder="Select Participant"
                                                    label="Participant / Captain"
                                                    showSearch={participantOptions.length > 7}
                                                />

                                                {/* Group Participant with SearchableDropdown */}
                                                <SearchableDropdown 
                                                    options={groupParticipantOptions}
                                                    value={selectedGroupParticipant}
                                                    onChange={setSelectedGroupParticipant}
                                                    placeholder="Select Group Participant"
                                                    label="Participant (Group / Pinnany)"
                                                    showSearch={groupParticipantOptions.length > 7}
                                                />

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

export default AddcertfitDetail;