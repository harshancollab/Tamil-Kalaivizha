import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';

const DPublishSTatusfest = () => {
  const [searchParams] = useSearchParams();
  const festival = searchParams.get('festival');
  const status = searchParams.get('status');
  const [title, setTitle] = useState('All Festival Items');

  // Mock data with item status to demonstrate filtering
  const itemsData = [
    {
      itemCode: "301",
      itemName: "Story Writing",
      stageNo: "1",
      cluster: "Tamil",
      participants: "Individual",
      itemType: "Literary",
      maxTime: "2 hours",
      date: "2025-05-15",
      completed: true,
      festival: "UP Tamil Kalaivizha"
    },
    {
      itemCode: "302",
      itemName: "Essay Writing",
      stageNo: "1",
      cluster: "Tamil",
      participants: "Individual",
      itemType: "Literary",
      maxTime: "1.5 hours",
      date: "2025-05-15",
      completed: true,
      festival: "UP Tamil Kalaivizha"
    },
    {
      itemCode: "304",
      itemName: "Poetry Recitation",
      stageNo: "2",
      cluster: "Tamil",
      participants: "Individual",
      itemType: "Performance",
      maxTime: "5 min",
      date: "2025-05-16",
      completed: true,
      festival: "UP Tamil Kalaivizha"
    },
    {
      itemCode: "305",
      itemName: "Group Song",
      stageNo: "3",
      cluster: "Tamil",
      participants: "Group",
      itemType: "Performance",
      maxTime: "10 min",
      date: "2025-05-16",
      completed: false,
      festival: "UP Tamil Kalaivizha"
    },
    {
      itemCode: "401",
      itemName: "Drama",
      stageNo: "2",
      cluster: "Drama",
      participants: "Group",
      itemType: "Performance",
      maxTime: "15 min",
      date: "2025-05-17",
      completed: true,
      festival: "Lp Tamil Kalaivizha"
    },
    {
      itemCode: "402",
      itemName: "Mono Act",
      stageNo: "2",
      cluster: "Drama",
      participants: "Individual",
      itemType: "Performance",
      maxTime: "5 min",
      date: "2025-05-17",
      completed: true,
      festival: "Lp Tamil Kalaivizha"
    },
    {
      itemCode: "405",
      itemName: "Classical Dance",
      stageNo: "3",
      cluster: "Dance",
      participants: "Individual",
      itemType: "Performance",
      maxTime: "7 min",
      date: "2025-05-18",
      completed: false,
      festival: "Lp Tamil Kalaivizha"
    },
    {
      itemCode: "501",
      itemName: "Debate",
      stageNo: "1",
      cluster: "Literary",
      participants: "Group",
      itemType: "Competition",
      maxTime: "30 min",
      date: "2025-05-19",
      completed: true,
      festival: "Hs Tamil Kalaivizha"
    },
    {
      itemCode: "502",
      itemName: "Quiz",
      stageNo: "1",
      cluster: "Literary",
      participants: "Group",
      itemType: "Competition",
      maxTime: "45 min",
      date: "2025-05-19",
      completed: false,
      festival: "Hs Tamil Kalaivizha"
    },
    {
      itemCode: "601",
      itemName: "Folk Dance",
      stageNo: "3",
      cluster: "Dance",
      participants: "Group",
      itemType: "Performance",
      maxTime: "10 min",
      date: "2025-05-20",
      completed: true,
      festival: "Hss Tamil Kalaivizha"
    },
    {
      itemCode: "606",
      itemName: "Painting",
      stageNo: "",
      cluster: "Art",
      participants: "Individual",
      itemType: "Visual Arts",
      maxTime: "2 hours",
      date: "2025-05-20",
      completed: false,
      festival: "Hss Tamil Kalaivizha"
    }
  ];

  // Filter data based on festival and status parameters
  const filteredItems = itemsData.filter(item => {
    // Filter by festival
    if (festival && festival !== 'ALL Festivel' && item.festival !== festival) {
      return false;
    }

    // Filter by status
    if (status === 'completed') {
      return item.completed === true;
    } else if (status === 'not-completed') {
      return item.completed === false;
    }

    // 'total' status or default case shows all items
    return true;
  });

  // Set the title based on parameters
  useEffect(() => {
    if (status === 'completed') {
      setTitle(`${festival || 'All Festival'} - Finished Festival Items`);
    } else if (status === 'not-completed') {
      setTitle(`${festival || 'All Festival'} - Not Completed Items`);
    } else {
      setTitle(`${festival || 'All Festival'} - All Festival Items`);
    }
  }, [festival, status]);

  const showMinimalDetails = status === 'completed';

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header section with title */}
          <div className="mb-4">
            <h2 className="text-xl font-bold leading-none tracking-tight">
              {title}
            </h2>
          </div>

          <div className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="bg-gray-50">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name </th>
                      
                      {!showMinimalDetails && (
                        <>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Stage No</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Cluster</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Participants</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Maximum Time</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Date of Item</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3 whitespace-nowrap">{item.itemCode}-{item.itemName}</td>
                          
                          {!showMinimalDetails && (
                            <>
                              <td className="p-2 md:p-3 whitespace-nowrap">{item.stageNo}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{item.cluster}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{item.participants}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{item.itemType}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{item.maxTime}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{item.date}</td>
                            </>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={showMinimalDetails ? 2 : 8} className="p-4 text-center">No items found matching the selected criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full"
            >
              Back to Status View
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DPublishSTatusfest;