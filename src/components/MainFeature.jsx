import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ApperIcon from './ApperIcon';
import { slideService } from '../services';

const MainFeature = ({ currentSlide }) => {
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
            <HeroSlide content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'services' && (
            <ServicesSlide content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'portfolio' && (
            <PortfolioSlide content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'about' && (
            <AboutSlide content={currentSlideData.content} />
          )}
          {currentSlideData?.type === 'contact' && (
            <ContactSlide content={currentSlideData.content} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const HeroSlide = ({ content }) => (
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
    
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 animate-pulse-slow">
        <ApperIcon name="ArrowRight" size={24} className="mr-2" />
        {content.cta}
      </button>
    </motion.div>
  </div>
);

const ServicesSlide = ({ content }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { serviceService } = await import('../services');
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
          <motion.div
            key={service.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PortfolioSlide = ({ content }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { projectService } = await import('../services');
        const result = await projectService.getAll();
        setProjects(result);
      } catch (err) {
        console.error('Failed to load projects:', err);
      }
    };
    loadProjects();
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedProject(project)}
            className="glass rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <ApperIcon name="Image" size={48} className="text-white/50 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl p-8 max-w-2xl w-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={24} />
                  </button>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutSlide = ({ content }) => (
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
      <div className="glass rounded-3xl p-8 relative overflow-hidden">
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
      </div>
    </motion.div>
  </div>
);

const ContactSlide = ({ content }) => (
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
        <motion.a
          key={index}
          href={method.link}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group block"
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
        </motion.a>
      ))}
    </div>

    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <a
        href="mailto:info@dreamwares.com"
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
      >
        <ApperIcon name="Send" size={24} className="mr-3" />
        Start Your Project Today
      </a>
    </motion.div>
  </div>
);

export default MainFeature;