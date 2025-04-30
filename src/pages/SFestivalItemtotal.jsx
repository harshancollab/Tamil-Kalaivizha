import React from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useLocation } from 'react-router-dom';

const SFestivalItemtotal = () => {
  const location = useLocation();
  const { festivalData, viewType } = location.state || {};
  
  // Use the provided data or fallback to sample data if not available
  const detailedItems = festivalData?.detailedItems || [
    { Item: "Folk Dance", StageNo: 1, Cluster: "A", Participants: 8, ItemType: "Group", MaximumTime: "10 min", DateOfItem: "2025-04-15" },
    { Item: "Classical Music", StageNo: 2, Cluster: "B", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-15" },
    { Item: "Speech", StageNo: 1, Cluster: "A", Participants: 1, ItemType: "Solo", MaximumTime: "7 min", DateOfItem: "2025-04-16" }
  ];

  return (
    <>
      <Header />
      <Dash />
      <div className="container mx-auto mt-8 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Item</th>
                <th className="px-4 py-2 border">Stage No</th>
                <th className="px-4 py-2 border">Cluster</th>
                <th className="px-4 py-2 border">Participants</th>
                <th className="px-4 py-2 border">Item Type</th>
                <th className="px-4 py-2 border">Maximum Time</th>
                <th className="px-4 py-2 border">Date of Item</th>
              </tr>
            </thead>
            <tbody>
              {detailedItems.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-2 border">{item.Item}</td>
                  <td className="px-4 py-2 border">{item.StageNo}</td>
                  <td className="px-4 py-2 border">{item.Cluster}</td>
                  <td className="px-4 py-2 border">{item.Participants}</td>
                  <td className="px-4 py-2 border">{item.ItemType}</td>
                  <td className="px-4 py-2 border">{item.MaximumTime}</td>
                  <td className="px-4 py-2 border">{item.DateOfItem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SFestivalItemtotal;