import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/molecules/Card';
import { projectService } from '@/services'; // Use @/ alias

const PortfolioSection = ({ content }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
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
          <Card
            key={project.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedProject(project)}
            className="overflow-hidden group"
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
          </Card>
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

export default PortfolioSection;