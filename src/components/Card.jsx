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
        transform transition-all duration-300 ease-in-out
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white animate-fade-in">
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