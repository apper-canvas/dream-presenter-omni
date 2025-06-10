import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/molecules/Card';
import { serviceService } from '@/services'; // Use @/ alias

const ServicesSection = ({ content }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const result = await serviceService.getAll();
        setServices(result);
      } catch (err) {
        console.error('Failed to load services:', err);
      }
    };
    loadServices();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold font-heading mb-4 gradient-text">
          {content.title}
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card
            key={service.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group" // Pass group class for hover effects
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ApperIcon name={service.icon} size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-400">
                  <ApperIcon name="Check" size={16} className="text-primary mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;