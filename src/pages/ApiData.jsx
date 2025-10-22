import React from 'react';
import ApiDataDisplay from '../components/ApiDataDisplay';

const ApiData = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          API Data Display
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse posts fetched from JSONPlaceholder API
        </p>
      </div>
      <ApiDataDisplay />
    </div>
  );
};

export default ApiData;