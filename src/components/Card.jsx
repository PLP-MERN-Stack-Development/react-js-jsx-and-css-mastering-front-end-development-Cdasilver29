import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = '',
  hover = false 
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md p-6
        ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {title}
        </h3>
      )}
      <div className="text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default Card;