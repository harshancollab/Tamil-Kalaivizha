import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllSchoolContactAPI } from '../services/allAPI';

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

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;

    // Create a simple table for printing
    let printTableHTML = `
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>School ID</th>
            <th>School Name</th>
            <th>Contact Details</th>
          </tr>
        </thead>
        <tbody>
    `;

    schoolContacts.forEach((school, index) => {
      printTableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${school.id}</td>
          <td>${school.name}</td>
          <td>
            <div>Headmaster: ${school.headmaster.phone}</div>
            <div>Team Manager: ${school.teamManager.phone}</div>
            <div>Chairman: ${school.chairman.phone}</div>
            <div>Escorting Teachers: ${getAllEscortingTeachers(school).join(', ')}</div>
          </td>
        </tr>
      `;
    });

    printTableHTML += `
        </tbody>
      </table>
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
          display: block !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
      </style>
      <div class="print-title">School Contacts List</div>
      ${printTableHTML}
    `;

    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
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
              onClick={handlePrint}
              className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full"
            >
              Print
            </button>
          </div>
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                  <table className="min-w-full text-center   print-table">
                    <thead className=" min-h-screen  ">
                      <tr className="text-gray-700">
                        <th className="p-2 md:p-3  text-xs sm:text-sm">Sl No</th>
                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code </th>
                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                        
                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Status</th>
                        
                      </tr>
                    </thead>
                    <tbody className=" text-xs sm:text-sm">
                    {schoolContacts.map((school, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3 whitespace-nowrap">{index + 1}</td>
                          <td className="p-2 md:p-3 whitespace-nowrap">{school.id}</td>
                          <td className="p-2 md:p-3 whitespace-nowrap ">{school.name}</td>
                          <td className="p-2 md:p-3 whitespace-nowrap">
                            <button
                              onClick={() => openModal(school)}
                              className="text-[#114568]  py-1 px-3 rounded-md "
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