// Add this new component to your project
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StatusFest = ({ festivalData }) => {
    const navigate = useNavigate();

    const handleItemClick = (category, status) => {
        // Navigate to the appropriate view with filters
        navigate(`/publishresultlist?festival=${category}&resultType=Declared Result&status=${status}`);
    };

    return (
        <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
            <thead className="bg-gray-50">
                <tr className="text-gray-700">
                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Category</th>
                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">
                        <span className="cursor-pointer hover:text-blue-600">Total Items</span>
                    </th>
                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">
                        <span className="cursor-pointer hover:text-blue-600">Items Completed</span>
                    </th>
                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">
                        <span className="cursor-pointer hover:text-blue-600">Items Not Completed</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                {festivalData.map((festival, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="p-2 md:p-3 whitespace-nowrap font-medium">{festival.category}</td>
                        <td 
                            className="p-2 md:p-3 whitespace-nowrap cursor-pointer hover:text-blue-600 hover:underline"
                            onClick={() => handleItemClick(festival.category, 'all')}
                        >
                            {festival.totalItems}
                        </td>
                        <td 
                            className="p-2 md:p-3 whitespace-nowrap cursor-pointer hover:text-blue-600 hover:underline"
                            onClick={() => handleItemClick(festival.category, 'completed')}
                        >
                            {festival.completedItems}
                        </td>
                        <td 
                            className="p-2 md:p-3 whitespace-nowrap cursor-pointer hover:text-blue-600 hover:underline"
                            onClick={() => handleItemClick(festival.category, 'pending')}
                        >
                            {festival.totalItems - festival.completedItems}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StatusFest;