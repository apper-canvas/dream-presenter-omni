import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick, ...motionProps }) => {
    return (
        <motion.div
            className={`glass rounded-2xl p-6 transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-2xl' : ''} ${className}`}
            onClick={onClick}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
};

export default Card;