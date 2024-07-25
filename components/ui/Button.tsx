
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <button {...props} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        {children}
    </button>
);
