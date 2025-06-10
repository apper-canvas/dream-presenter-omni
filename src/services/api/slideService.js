import slideData from '../mockData/slides.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const slideService = {
  async getAll() {
    await delay(300);
    return [...slideData];
  },

  async getById(id) {
    await delay(200);
    const slide = slideData.find(item => item.id === id);
    if (!slide) throw new Error('Slide not found');
    return { ...slide };
  }
};

export default slideService;