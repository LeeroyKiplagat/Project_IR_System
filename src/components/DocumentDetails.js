import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DocumentDetails() {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/dummy-index/_doc/${id}?pretty`);
        setDocument(response.data._source);
      } catch (error) {
        console.error("Error fetching document:", error);
        setError("Error loading document details");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center py-8 text-gray-500">Document not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            ← Back to Search
          </button>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {document.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
                  {document.category}
                </span>
                <span>Author: {document.author}</span>
                <span>
                  Published:{" "}
                  {new Date(document.published_date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">
                {document.content}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Document Information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Document ID:</span>
                  <span className="ml-2 text-gray-900">{id}</span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 text-gray-900">
                    {document.category}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Author:</span>
                  <span className="ml-2 text-gray-900">{document.author}</span>
                </div>
                <div>
                  <span className="text-gray-500">Published Date:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(document.published_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetails;
