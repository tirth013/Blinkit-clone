import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('q');

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white bg-gray-900">
      {query ? (
        <h2 className="text-2xl font-bold mb-4">Results for: <span className="text-yellow-400">{query}</span></h2>
      ) : (
        <h2 className="text-2xl font-bold mb-4">Search for products</h2>
      )}
      {/* Here you can map and show search results based on the query */}
    </div>
  );
};

export default SearchPage;