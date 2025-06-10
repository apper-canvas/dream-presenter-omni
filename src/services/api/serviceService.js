import serviceData from '../mockData/services.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const serviceService = {
  async getAll() {
    await delay(250);
    return [...serviceData];
  },

  async getById(id) {
    await delay(200);
    const service = serviceData.find(item => item.id === id);
    if (!service) throw new Error('Service not found');
    return { ...service };
  }
};

export default serviceService;