import React from 'react';

const Pagination = ({
    currentPage,
    totalItems,
    rowsPerPage,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const indexOfFirstItem = (currentPage - 1) * rowsPerPage;
    const indexOfLastItem = Math.min(indexOfFirstItem + rowsPerPage, totalItems);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Adjust this number as needed

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate start and end pages
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're at the beginning
            if (currentPage <= 3) {
                endPage = Math.min(4, totalPages - 1);
            }
            // Adjust if we're at the end
            else if (currentPage >= totalPages - 2) {
                startPage = Math.max(totalPages - 3, 2);
            }

            // Add ellipsis if needed after first page
            if (startPage > 2) {
                pageNumbers.push('...');
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis if needed before last page
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                >
                    <i className="fa-solid fa-angle-left"></i>
                    <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {renderPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === 'number' && handlePageChange(page)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page
                                    ? 'bg-[#305A81] text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                } ${page === '...' ? 'pointer-events-none' : ''}`}
                            disabled={page === '...'}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                >
                    <span className="hidden sm:inline">Next</span>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>
    );
};

export default Pagination;