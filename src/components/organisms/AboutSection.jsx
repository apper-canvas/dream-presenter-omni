import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/molecules/Card';

const AboutSection = ({ content }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-5xl font-bold font-heading mb-6 gradient-text">
        {content.title}
      </h2>
      <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
        {content.description.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 grid grid-cols-2 gap-6"
      >
        {content.stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
    
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <Card className="p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full -translate-y-16 translate-x-16 opacity-20" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary to-accent rounded-full translate-y-12 -translate-x-12 opacity-20" />
        
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center"
          >
            <ApperIcon name="Code" size={36} className="text-white" />
          </motion.div>
          <h3 className="text-2xl font-semibold mb-4">Innovation Driven</h3>
          <p className="text-gray-300">
            We leverage cutting-edge technologies to deliver exceptional digital experiences.
          </p>
        </div>
      </Card>
    </motion.div>
  </div>
);

export default AboutSection;