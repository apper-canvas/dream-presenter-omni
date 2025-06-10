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
    <div className="py-12">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center animate-glow">
            <ApperIcon name="Zap" size={36} className="text-white" />
          </div>
        </motion.div>
        <h2 className="text-6xl md:text-7xl font-bold font-heading mb-6 gradient-text">
          {content.title}
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {content.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
        {services.map((service, index) => (
          <Card
            key={service.id}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden h-full"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon Section */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <ApperIcon name={service.icon} size={36} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-base">
                {service.description}
              </p>
              
              {/* Features List */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Key Capabilities</h4>
                <ul className="space-y-2.5">
                  {service.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.15) + (i * 0.1), duration: 0.3 }}
                      className="flex items-start text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <ApperIcon name="Check" size={12} className="text-white" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Card>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center mt-16 pt-12 border-t border-white/10"
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-200">
          Ready to Transform Your Digital Presence?
        </h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Let's discuss how our expertise can help accelerate your business growth and digital transformation journey.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
          onClick={() => window.location.href = "mailto:info@dreamwares.com"}
        >
          <ApperIcon name="MessageCircle" size={24} className="mr-3" />
          Start Your Project
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ServicesSection;