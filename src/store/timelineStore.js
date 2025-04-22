import { create } from 'zustand';

const useTimelineStore = create((set) => ({
  zoomLevel: 1,
  showFullDay: false,
  selectedMember: null,
  setZoomLevel: (level) => set({ zoomLevel: level }),
  setShowFullDay: (show) => set({ showFullDay: show }),
  setSelectedMember: (member) => set({ selectedMember: member }),
}));

export default useTimelineStore; 