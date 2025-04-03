import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllSchoolContactAPI } from '../services/allAPI'

const SclContactList = () => {
  const [Alllist, setList] = useState([]);
  const printRef = useRef();
  
  console.log(Alllist);
  
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
        phone: "9604969486"
      },
      additionalContact: {
        phone: "9234567890"
      }
    },
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
        phone: "9345678901"
      }
    },
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
        phone: "9456789012"
      }
    }
  ];
  
 
  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    
    
    let printTableHTML = `
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>School ID</th>
            <th>School Name</th>
            <th>Chairman Phone</th>
            <th>Headmaster Phone</th>
            <th>Team Manager Phone</th>
            <th>Escoting Teacher Phone</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    
    schoolContacts.forEach(school => {
      printTableHTML += `
        <tr>
          <td>${school.id}</td>
          <td>${school.name}</td>
          <td>${school.chairman.phone}</td>
          <td>${school.headmaster.phone}</td>
          <td>${school.teamManager.phone}</td>
          <td>${school.escotingTeacher.phone}</td>
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
          text-align: center;
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
          {/* Your original header section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">School Contacts List</h2>
            <button 
              onClick={handlePrint}
              className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full"
            >
              Print
            </button>
          </div>

          {/* Your original content design preserved exactly */}
          <div ref={printRef} className="w-full">
            <div className="space-y-4">
              {schoolContacts.map((school, index) => (
                <div key={index} className="bg-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                    <div className="flex justify-center md:justify-start mt-2">
                      <span className="text-blue-500 text-lg mr-2">{school.id}</span>
                      <span>-{school.name}</span>
                    </div>
                    
                    <div className="flex justify-center md:justify-start">
                      <span className="font-medium">Chairman Phone Number :</span>
                      <span className="text-blue-500 ml-2">{school.chairman.phone}</span>
                    </div>
                    
                    <div className="flex justify-center md:justify-start">
                      <span className="font-medium">Team Manager Phone Number :</span>
                      <span className="text-blue-500 ml-2">{school.teamManager.phone}</span>
                    </div>
                    
                    <div className="flex justify-center md:justify-start">
                    
                    </div>
                    
                    <div className="flex justify-center md:justify-start">
                      <span className="font-medium">Headmaster Phone Number :</span>
                      <span className="text-blue-500 ml-2">{school.headmaster.phone}</span>
                    </div>
                    
                    <div className="flex justify-center md:justify-start">
                      <span className="font-medium">Escoting Teacher Phone Number :</span>
                      <span className="text-blue-500 ml-2">{school.escotingTeacher.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SclContactList