import { create } from 'zustand';

// Date demo pentru simulare
const demoUsers = [
  {
    id: 1,
    name: "Ianis Mihai",
    membershipType: "1 LUNA REGULAR",
    expiryDate: "02.05.2025",
    accessLevel: "basic",
    visits: 12,
    lastVisit: "2024-04-22"
  },
  {
    id: 2,
    name: "Maria Popescu",
    membershipType: "3 LUNI PREMIUM",
    expiryDate: "07.07.2024",
    accessLevel: "premium",
    visits: 45,
    lastVisit: "2024-04-21"
  },
  {
    id: 3,
    name: "Alexandru Ion",
    membershipType: "1 AN VIP",
    expiryDate: "15.04.2025",
    accessLevel: "vip",
    visits: 156,
    lastVisit: "2024-04-22",
    personalTrainer: "Coach Adrian"
  }
];

const getCurrentDemoUser = () => {
  // Simulăm un utilizator aleatoriu pentru demo
  return demoUsers[Math.floor(Math.random() * demoUsers.length)];
};

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  demoMode: true, // Flag pentru a indica că suntem în modul demo
  
  setUser: (userData) => set({ user: userData }),
  
  login: async () => {
    try {
      const mockUser = getCurrentDemoUser();
      localStorage.setItem('token', 'demo-token');
      set({ user: mockUser });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  switchDemoUser: () => {
    // Funcție pentru a schimba între utilizatorii demo
    const newUser = getCurrentDemoUser();
    set({ user: newUser });
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = getCurrentDemoUser();
        set({ user: userData, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ loading: false });
    }
  }
}));

export default useAuthStore; 