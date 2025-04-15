import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllSchoolContactAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const SclContactList = () => {
  const [Alllist, setList] = useState([]);
  const printRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    getAllitemise();
  }, []);

  const getAllitemise = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getAllSchoolContactAPI(reqHeader);
        if (result?.status === 200) {
          setList(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const openModal = (school) => {
    setSelectedSchool(school);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSchool(null);
  };

  // Sample data - in production, you would use Alllist instead
  const schoolContacts = [
    {
      id: "30003",
      name: "G. H. S. S. Vaguvuurai",
      chairman: {
        phone: "9027736734"
      },
      headmaster: {
        phone: "9027739839"
      },
      teamManager: {
        phone: "9387763274"
      },
      escotingTeacher: {
        phone: "9384763473"
      },
      additionalContact: {
        phone: "9123456789"
      }
    },
    {
      id: "6004",
      name: "G. H. S. S. Kumily",
      chairman: {
        phone: "9022397374"
      },
      headmaster: {
        phone: "9577747847"
      },
      teamManager: {
        phone: "9473489868"
      },
      escotingTeacher: {
        phone: "9604960486"
      },
      escotingTeacher2: {
        phone: "9234567790"
      },
      escotingTeacher3: {
        phone: "9234567790"
      },
      escotingTeacher4: {
        phone: "9234567896"
      }
    },
    {
      id: "30004",
      name: "G. H. S. S. Vaguvuurai",
      chairman: {
        phone: "9027736734"
      },
      headmaster: {
        phone: "9027739839"
      },
      teamManager: {
        phone: "9387763274"
      },
      escotingTeacher: {
        phone: "9384763473"
      },
      escotingTeacher2: {
        phone: "9456789012"
      }
    },
    {
      id: "30005",
      name: "G. H. S. S. Vaguvuurai",
      chairman: {
        phone: "9027736734"
      },
      headmaster: {
        phone: "9027739839"
      },
      teamManager: {
        phone: "9387763274"
      },
      escotingTeacher: {
        phone: "9384763473"
      },
      escotingTeacher2: {
        phone: "9456789012"
      },
      escotingTeacher3: {
        phone: "9456789013"
      },
      escotingTeacher4: {
        phone: "9456789014"
      },
      escotingTeacher5: {
        phone: "9456789015"
      }
    }
  ];

  // Get all escorting teacher phones from a school object
  const getAllEscortingTeachers = (school) => {
    const teachers = [];

    // Add base escotingTeacher if present
    if (school.escotingTeacher) {
      teachers.push(school.escotingTeacher.phone);
    }

    // Check for numbered escotingTeacher fields (escotingTeacher2, escotingTeacher3, etc.)
    for (let i = 2; i <= 10; i++) {
      const key = `escotingTeacher${i}`;
      if (school[key] && school[key].phone) {
        teachers.push(school[key].phone);
      }
    }

    return teachers;
  };

  // New PDF generation function using html2pdf
  const generatePDF = () => {
    // Create a container for PDF content
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = "School Contacts List";
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.fontSize = '18px';
    pdfContent.appendChild(titleElement);

    // Create table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Sl. No.', 'School ID', 'School Name', 'Contact Details'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.style.border = '1px solid #ddd';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f2f2f2';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'left';
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Use schoolContacts data (in production, you would use Alllist)
    schoolContacts.forEach((school, index) => {
      const row = document.createElement('tr');
      
      // Add cells
      const indexCell = document.createElement('td');
      indexCell.textContent = index + 1;
      indexCell.style.border = '1px solid #ddd';
      indexCell.style.padding = '8px';
      row.appendChild(indexCell);
      
      const idCell = document.createElement('td');
      idCell.textContent = school.id;
      idCell.style.border = '1px solid #ddd';
      idCell.style.padding = '8px';
      row.appendChild(idCell);
      
      const nameCell = document.createElement('td');
      nameCell.textContent = school.name;
      nameCell.style.border = '1px solid #ddd';
      nameCell.style.padding = '8px';
      row.appendChild(nameCell);
      
      const contactsCell = document.createElement('td');
      contactsCell.style.border = '1px solid #ddd';
      contactsCell.style.padding = '8px';
      
      // Create contact details entries
      const contactDetails = document.createElement('div');
      
      const headmasterDiv = document.createElement('div');
      headmasterDiv.textContent = `Headmaster: ${school.headmaster.phone}`;
      headmasterDiv.style.marginBottom = '4px';
      contactDetails.appendChild(headmasterDiv);
      
      const teamManagerDiv = document.createElement('div');
      teamManagerDiv.textContent = `Team Manager: ${school.teamManager.phone}`;
      teamManagerDiv.style.marginBottom = '4px';
      contactDetails.appendChild(teamManagerDiv);
      
      const chairmanDiv = document.createElement('div');
      chairmanDiv.textContent = `Chairman: ${school.chairman.phone}`;
      chairmanDiv.style.marginBottom = '4px';
      contactDetails.appendChild(chairmanDiv);
      
      const escortingTeachersDiv = document.createElement('div');
      escortingTeachersDiv.textContent = `Escorting Teachers: ${getAllEscortingTeachers(school).join(', ')}`;
      contactDetails.appendChild(escortingTeachersDiv);
      
      contactsCell.appendChild(contactDetails);
      row.appendChild(contactsCell);
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    pdfContent.appendChild(table);
    
    // PDF filename
    const fileName = 'School_Contacts_List.pdf';
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Use landscape for better fit
    };
    
    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Dash />
        <div className="flex-1 p-4 w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">School Contacts List</h2>
            <button
              onClick={generatePDF}
              className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full"
            >
            Print
            </button>
          </div>
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                  <table className="min-w-full text-center print-table">
                    <thead className="min-h-screen">
                      <tr className="text-gray-700">
                        <th className="p-2 md:p-3 text-xs sm:text-sm">Sl No</th>
                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm">
                    {schoolContacts.map((school, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3 whitespace-nowrap">{index + 1}</td>
                          <td className="p-2 md:p-3 whitespace-nowrap">{school.id}</td>
                          <td className="p-2 md:p-3 whitespace-nowrap">{school.name}</td>
                          <td className="p-2 md:p-3 whitespace-nowrap">
                            <button
                              onClick={() => openModal(school)}
                              className="text-[#114568] py-1 px-3 rounded-md"
                            >
                              View More
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {modalOpen && selectedSchool && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedSchool.id} - {selectedSchool.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Chairman Contact</h4>
                    <div className="flex items-center">
                      <span className="font-medium">Phone Number:</span>
                      <span className="text-blue-500 ml-2">{selectedSchool.chairman.phone}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Headmaster Contact</h4>
                    <div className="flex items-center">
                      <span className="font-medium">Phone Number:</span>
                      <span className="text-blue-500 ml-2">{selectedSchool.headmaster.phone}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Team Manager Contact</h4>
                    <div className="flex items-center">
                      <span className="font-medium">Phone Number:</span>
                      <span className="text-blue-500 ml-2">{selectedSchool.teamManager.phone}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Escorting Teacher Contacts</h4>
                    <div className="space-y-2">
                      {getAllEscortingTeachers(selectedSchool).map((phone, idx) => (
                        <div key={idx} className="flex items-center">
                          <span className="font-medium">Phone Number {idx + 1}:</span>
                          <span className="text-blue-500 ml-2">{phone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SclContactList;