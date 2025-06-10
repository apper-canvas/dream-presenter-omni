import React from 'react';
import Input from '@/components/atoms/Input';

const FormField = ({ label, id, ...inputProps }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-gray-300 text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            <Input id={id} {...inputProps} />
        </div>
    );
};

export default FormField;