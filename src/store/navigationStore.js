import { create } from 'zustand';

const useNavigationStore = create((set) => ({
  activeMenu: 'timeline',
  setActiveMenu: (menu) => set({ activeMenu: menu }),
}));

export default useNavigationStore; 