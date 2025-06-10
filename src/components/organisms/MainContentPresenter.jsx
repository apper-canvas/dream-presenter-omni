import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import HeroSection from '@/components/organisms/HeroSection';
import ServicesSection from '@/components/organisms/ServicesSection';
import PortfolioSection from '@/components/organisms/PortfolioSection';
import AboutSection from '@/components/organisms/AboutSection';
import ContactForm from '@/components/organisms/ContactForm'; // Use ContactForm
import { slideService } from '@/services';

const MainContentPresenter = ({ currentSlide }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSlides = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await slideService.getAll();
        setSlides(result);
      } catch (err) {
        setError(err.message || 'Failed to load slides');
      } finally {
        setLoading(false);
      }
    };
    loadSlides();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Error Loading Presentation</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="FileX" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Slides Available</h3>
          <p className="text-gray-400">The presentation content is not available.</p>
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className="h-screen flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-6xl"
        >
          {currentSlideData?.type === 'hero' && (
            <HeroSection content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'services' && (
            <ServicesSection content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'portfolio' && (
            <PortfolioSection content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'about' && (
            <AboutSection content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'contact' && (
            <ContactForm content={currentSlideData.content} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainContentPresenter;