import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, ...motionProps }) => {
    return (
        <motion.button
            onClick={onClick}
            className={className}
            {...motionProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;