import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';

const ContactForm = ({ content }) => (
  <div className="text-center">
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-12"
    >
      <h2 className="text-5xl font-bold font-heading mb-6 gradient-text">
        {content.title}
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        {content.subtitle}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {content.methods.map((method, index) => (
        <Card
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="group block"
          onClick={() => window.location.href = method.link} // Replicate anchor behavior
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <ApperIcon name={method.icon} size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {method.label}
          </h3>
          <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
            {method.value}
          </p>
        </Card>
      ))}
    </div>

    <Button
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.href = "mailto:info@dreamwares.com"} // Replicate anchor behavior
      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
    >
      <ApperIcon name="Send" size={24} className="mr-3" />
      Start Your Project Today
    </Button>
  </div>
);

export default ContactForm;