import { create } from 'zustand';

const useCategoryStore = create((set) => ({
  categories: [
    { id: 'all', name: 'Toate', icon: 'all_inclusive' },
    { id: 'memberships', name: 'Abonamente', icon: 'card_membership' },
    { id: 'services', name: 'Servicii', icon: 'miscellaneous_services' },
    { id: 'supplements', name: 'Suplimente', icon: 'nutrition' },
    { id: 'accessories', name: 'Accesorii', icon: 'fitness_center' },
    { id: 'drinks', name: 'Băuturi', icon: 'local_drink' },
  ],
  selectedCategory: 'all',
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
}));

export default useCategoryStore; 