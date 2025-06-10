import projectData from '../mockData/projects.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const projectService = {
  async getAll() {
    await delay(300);
    return [...projectData];
  },

  async getById(id) {
    await delay(200);
    const project = projectData.find(item => item.id === id);
    if (!project) throw new Error('Project not found');
    return { ...project };
  }
};

export default projectService;