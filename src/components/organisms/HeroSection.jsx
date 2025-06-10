import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const HeroSection = ({ content }) => (
  <div className="text-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-8"
    >
      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl flex items-center justify-center animate-glow">
        <ApperIcon name="Zap" size={48} className="text-white" />
      </div>
    </motion.div>
    
    <motion.h1
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="text-6xl md:text-8xl font-bold font-heading mb-6"
    >
      <span className="gradient-text">{content.title}</span>
    </motion.h1>
    
    <motion.p
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
    >
      {content.subtitle}
    </motion.p>
    
    <Button
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 animate-pulse-slow"
      onClick={() => console.log('CTA clicked')} // Placeholder, original didn't have specific handler
    >
      <ApperIcon name="ArrowRight" size={24} className="mr-2" />
      {content.cta}
    </Button>
  </div>
);

export default HeroSection;