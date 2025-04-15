import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ParticipantsCardList = () => {
  const [participants, setParticipants] = useState([]);
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get photoStatus from URL, default to "With Photo" if not present
  const photoStatus = searchParams.get('photoStatus') || "With Photo";
  
  useEffect(() => {
    getAllParticipants();
  }, []);

  const getAllParticipants = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await (reqHeader);
        if (result?.status === 200) {
          setParticipants(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Sample participant data if API fails or for development
  const sampleParticipants = [
    { id: 1, regNo: "2", name: "Riyashree S", gender: "Female", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 2, regNo: "23", name: "Kaviya L", gender: "Female", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 3, regNo: "11", name: "Mukila M", gender: "Female", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 4, regNo: "2", name: "Sharmila P", gender: "Female", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 5, regNo: "2", name: "Roshini K", gender: "Female", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 6, regNo: "2", name: "XYZ", gender: "Male", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
  ];

  const handlePhotoStatusChange = (e) => {
    // Update URL when photoStatus changes
    setSearchParams({ photoStatus: e.target.value });
  };

  // Generate PDF using html2pdf library
  const generatePDF = () => {
    const data = participants.length > 0 ? participants : sampleParticipants;
    
    // Create a container for PDF content
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = `Participants Card - ${photoStatus}`;
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);
    
    // Create card grid container
    const cardGrid = document.createElement('div');
    cardGrid.style.display = 'grid';
    cardGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    cardGrid.style.gap = '10px';
    
    // Generate cards
    for (let i = 0; i < data.length; i++) {
      const participant = data[i];
      
      // Create card
      const card = document.createElement('div');
      card.style.border = '1px solid #000';
      card.style.padding = '10px';
      card.style.marginBottom = '10px';
      card.style.textAlign = 'center';
      
      // Card header
      const cardHeader = document.createElement('div');
      cardHeader.textContent = 'Tamil Kalaivizha 2024 - 2025';
      cardHeader.style.fontWeight = 'bold';
      cardHeader.style.marginBottom = '5px';
      card.appendChild(cardHeader);
      
      // School info
      const cardSchool = document.createElement('div');
      cardSchool.textContent = 'Idukki Revenue District SGHSS, KATTAPPANA';
      cardSchool.style.fontSize = '0.8em';
      cardSchool.style.marginBottom = '10px';
      card.appendChild(cardSchool);
      
      // Photo placeholder if needed
      if (photoStatus === "With Photo") {
        const photoPlaceholder = document.createElement('div');
        photoPlaceholder.style.width = '80px';
        photoPlaceholder.style.height = '80px';
        photoPlaceholder.style.backgroundColor = '#eee';
        photoPlaceholder.style.margin = '0 auto 10px auto';
        card.appendChild(photoPlaceholder);
      }
      
      // Participant name
      const nameElement = document.createElement('div');
      nameElement.textContent = participant.name;
      nameElement.style.fontWeight = '500';
      nameElement.style.marginBottom = '5px';
      card.appendChild(nameElement);
      
      // Participant details
      const detailsDiv = document.createElement('div');
      detailsDiv.style.display = 'flex';
      detailsDiv.style.justifyContent = 'center';
      detailsDiv.style.gap = '10px';
      detailsDiv.style.marginBottom = '5px';
      detailsDiv.style.fontSize = '0.9em';
      
      const regNo = document.createElement('div');
      regNo.textContent = `Reg No : ${participant.regNo}`;
      detailsDiv.appendChild(regNo);
      
      const classInfo = document.createElement('div');
      classInfo.textContent = `Class : ${participant.class}`;
      classInfo.style.borderLeft = '1px solid #ccc';
      classInfo.style.paddingLeft = '8px';
      detailsDiv.appendChild(classInfo);
      
      card.appendChild(detailsDiv);
      
      // School details
      const schoolDetails = document.createElement('div');
      schoolDetails.textContent = `${participant.schoolCode} ${participant.schoolName}`;
      schoolDetails.style.fontSize = '0.9em';
      schoolDetails.style.marginBottom = '5px';
      card.appendChild(schoolDetails);
      
      // Event date
      const eventDate = document.createElement('div');
      eventDate.textContent = 'Stage 5 on 7 Dec 2023';
      eventDate.style.fontSize = '0.9em';
      eventDate.style.marginBottom = '5px';
      card.appendChild(eventDate);
      
      // Event details
      const eventDetails = document.createElement('div');
      eventDetails.innerHTML = '304 - Mono Act, 300 - Versification,<br />301 - Story Writing' + 
                             (participant.id === 4 ? ', 302 - Drama' : '');
      eventDetails.style.fontSize = '0.9em';
      card.appendChild(eventDetails);
      
      // Add card to grid
      cardGrid.appendChild(card);
    }
    
    // Add card grid to PDF content
    pdfContent.appendChild(cardGrid);
    
    // PDF filename
    const fileName = `Participant_Cards_${photoStatus.replace(/ /g, '_')}.pdf`;
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
  };

  const getGridRows = () => {
    const data = participants.length > 0 ? participants : sampleParticipants;
    const rows = [];
    for (let i = 0; i < data.length; i += 3) {
      rows.push(data.slice(i, i + 3));
    }
    return rows;
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
         
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants Card List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  value={photoStatus}
                  onChange={handlePhotoStatusChange}
                >
                  <option value="With Photo">With Photo</option>
                  <option value="Without Photo">Without Photo</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                onClick={generatePDF}
              >
                Print
              </button>
            </div>
          </div>

          {/* Table view */}
          <div className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      {photoStatus === "With Photo" && (
                        <th className="p-2 md:p-3">Picture</th>
                      )}
                      <th className="p-2 md:p-3">Reg No</th>
                      <th className="p-2 md:p-3">Name</th>
                      <th className="p-2 md:p-3">Gender</th>
                      <th className="p-2 md:p-3">Class</th>
                      <th className="p-2 md:p-3">School code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {(participants.length > 0 ? participants : sampleParticipants).map((participant, index) => (
                      <tr key={participant.id || index} className="hover:bg-gray-100">
                        <td className="p-2 md:p-3">{index + 1}</td>
                        {photoStatus === "With Photo" && (
                          <td className="p-2 justify-center items-center md:p-3">
                            <div className="w-12 h-12 bg-gray-200 mx-auto"></div>
                          </td>
                        )}
                        <td className="p-2 md:p-3">{participant.regNo}</td>
                        <td className="p-2 md:p-3">{participant.name}</td>
                        <td className="p-2 md:p-3">{participant.gender}</td>
                        <td className="p-2 md:p-3">{participant.class}</td>
                        <td className="p-2 md:p-3">{participant.schoolCode}</td>
                        <td className="p-2 md:p-3">{participant.schoolName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Hidden section for card layout (keeping for reference) */}
          <div ref={printRef} className="hidden">
            <div className="participant-cards-grid">
              {getGridRows().map((row, rowIndex) => (
                row.map((participant, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="participant-card">
                    <div className="card-header">
                      Tamil Kalaivizha 2024 - 2025
                    </div>
                    <div className="card-school">
                      Idukki Revenue District SGHSS, KATTAPPANA
                    </div>
                    
                    {photoStatus === "With Photo" && (
                      <div className="card-photo"></div>
                    )}
                    
                    <div className="card-name">
                      {participant.name}
                    </div>
                    
                    <div className="card-details">
                      <div>Reg No : {participant.regNo}</div>
                      <div style={{borderLeft: '1px solid #ccc', paddingLeft: '8px'}}>Class : {participant.class}</div>
                    </div>
                    
                    <div className="card-school-details">
                      {participant.schoolCode} {participant.schoolName}
                    </div>
                    
                    <div className="card-school-details">
                      Stage 5 on 7 Dec 2023
                    </div>
                    
                    <div className="card-event-details">
                      304 - Mono Act, 300 - Versification,<br />
                      301 - Story Writing{participant.id === 4 ? ', 302 - Drama' : ''}
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantsCardList