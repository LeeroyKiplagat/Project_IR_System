import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import DocumentDetails from "./components/DocumentDetails";
import axios from "axios";

function SearchPage() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch all documents when the component mounts
  useEffect(() => {
    const fetchAllDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/dummy-index/_search?pretty&from=${
            (currentPage - 1) * pageSize
          }&size=${pageSize}`
        );
        console.log(
          "Initial documents loaded:",
          JSON.stringify(response.data, null, 2)
        );
        setSearchResults(response.data);
        const totalHits = response.data.hits?.total?.value || 0;
        setTotalPages(Math.ceil(totalHits / pageSize));
      } catch (error) {
        console.error("Error loading initial documents:", error);
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${
              error.response.data.error?.reason || "Unknown error"
            }`
          );
        } else if (error.request) {
          setError(
            "Could not connect to Elasticsearch. Please make sure the server is running."
          );
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllDocuments();
  }, [currentPage, pageSize]);

  const handleSearch = async (searchUrl) => {
    setLoading(true);
    setError(null);
    try {
      const paginatedUrl = `${searchUrl}&from=${
        (currentPage - 1) * pageSize
      }&size=${pageSize}`;
      console.log("Sending search request to:", paginatedUrl);
      const response = await axios.get(paginatedUrl);
      console.log("Search response:", JSON.stringify(response.data, null, 2));
      setSearchResults(response.data);
      const totalHits = response.data.hits?.total?.value || 0;
      setTotalPages(Math.ceil(totalHits / pageSize));
    } catch (error) {
      console.error("Search error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        setError(
          `Error: ${error.response.status} - ${
            error.response.data.error?.reason || "Unknown error"
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError(
          "Could not connect to Elasticsearch. Please make sure the server is running."
        );
      } else {
        console.error("Error setting up request:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Information Retrieval System
            </h1>
          </div>
          <div className="p-6">
            <SearchBar onSearch={handleSearch} />
            <div className="h-6"></div>
            {error && (
              <>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  <p>{error}</p>
                </div>
                <div className="h-6"></div>
              </>
            )}
            <SearchResults
              results={searchResults}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/document/:id" element={<DocumentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
