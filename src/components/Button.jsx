import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white hover:shadow-lg',
    danger: 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium 
        transition-all duration-200 ease-in-out
        transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;