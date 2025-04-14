import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';

const CertificateParticipate = () => {
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const dropdownRef = useRef(null);
  
  // Sample participant data - replace with your actual data source
  const participants = [
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
    { id: "all", name: "All Participants" }
  ];

  // Reset highlighted index when dropdown opens/closes
  useEffect(() => {
    if (isDropdownOpen) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(-1);
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
          prev < participants.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleParticipantSelect(participants[highlightedIndex]);
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

  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    // Generate certificate based on selected participant
    if (selectedParticipant) {
      if (selectedParticipant === "All Participants") {
        // Handle generating certificates for all participants
        console.log("Generating certificates for all participants");
        setCertificateData(participants.filter(p => p.id !== "all"));
      } else {
        // Find the selected participant in the array
        const participantId = selectedParticipant.split(' - ')[0];
        const participant = participants.find(p => p.id.toString() === participantId);
        
        if (participant) {
          console.log("Generating certificate for:", participant.name);
          setCertificateData([participant]);
        }
      }
      
      setShowCertificate(true);
    }
  };

  const handleBackToSelection = () => {
    setShowCertificate(false);
    setCertificateData(null);
  };

  return (
    <>
      <div>
        <Header/>
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
          <Dash/>
          <div className="flex-1 p-4 md:p-2 w-full overflow-x-auto">
            {/* Certificate Display or Selection Form */}
            <div className="bg-gray-200 p-4 rounded-lg min-h-screen">
              {!showCertificate ? (
                <>
                  <h2 className="text-lg font-semibold mb-4">Certificate Participant Wise</h2>
                  <form onSubmit={handleGenerateCertificate}>
                    <div className="flex justify-center mt-28">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row mb-8">
                          <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">
                            Participant
                          </label>
                          <div className="w-full md:w-80 relative">
                            <div className="relative">
                              <input
                                placeholder='Select Participant'
                                type="text"
                                className="border border-blue-600 px-2 py-1 rounded-full w-full cursor-pointer pr-8"
                                value={selectedParticipant}
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
                                    <path d="m18 15-6-6-6 6"/>
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
                                    <path d="m6 9 6 6 6-6"/>
                                  </svg>
                                )}
                              </div>
                            </div>
                            {isDropdownOpen && (
                              <div 
                                ref={dropdownRef}
                                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                                role="listbox"
                              >
                                {participants.map((participant, index) => (
                                  <div
                                    key={participant.id}
                                    className={`px-4 py-2 cursor-pointer ${
                                      index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'
                                    } ${participant.id === "all" ? "font-semibold border-b border-gray-200" : ""}`}
                                    onClick={() => handleParticipantSelect(participant)}
                                    role="option"
                                    aria-selected={index === highlightedIndex}
                                  >
                                    {participant.id === "all" ? 
                                      participant.name : 
                                      `${participant.id} - ${participant.name}`
                                    }
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='text-center'>
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-20"
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
                  <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
                    {/* Certificate Title */}
                    <h1 className="text-xl font-bold text-center mb-6">Certificate Participant Wise Report</h1>
                    
                    {/* Participants Data */}
                    {certificateData && certificateData.map((participant, index) => (
                      <div key={participant.id} className="mb-8 ">
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
                  
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleBackToSelection}
                      className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-8 py-2 rounded-full"
                    >
                      Back
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

export default CertificateParticipate;


