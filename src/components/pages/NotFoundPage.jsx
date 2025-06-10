import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-primary mx-auto mb-6" />
        </motion.div>
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The presentation slide you're looking for doesn't exist or has been moved.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
            Back to Presentation
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;