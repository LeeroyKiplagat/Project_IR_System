import React from "react";
import { useNavigate } from "react-router-dom";

function SearchResults({
  results,
  loading,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const hits = results.hits?.hits || [];
  const total = results.hits?.total?.value || 0;

  if (hits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No results found. Try a different search term or category.
      </div>
    );
  }

  const handlePageSizeChange = (e) => {
    onPageSizeChange(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          Found {total} {total === 1 ? "result" : "results"}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Results per page:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {hits.map((hit) => (
          <div
            key={hit._id}
            onClick={() => navigate(`/document/${hit._id}`)}
            className="search-card bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {hit._source.title}
              </h3>
              <span className="search-badge bg-primary-100 text-primary-800">
                {hit._source.category}
              </span>
            </div>
            <p className="text-gray-600 line-clamp-2">{hit._source.content}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>Author: {hit._source.author}</span>
              <span>Score: {hit._score.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
            )
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page
                      ? "bg-primary-500 text-white"
                      : "border border-gray-300"
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
