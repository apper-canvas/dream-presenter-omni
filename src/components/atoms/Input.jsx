import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, className, ...props }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-3 rounded-lg bg-surface-700 border border-surface-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 ${className}`}
            {...props}
        />
    );
};

export default Input;