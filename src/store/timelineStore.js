import { create } from 'zustand';

const useTimelineStore = create((set) => ({
  zoomLevel: 1,
  showFullDay: false,
  setZoomLevel: (level) => set({ zoomLevel: level }),
  setShowFullDay: (show) => set({ showFullDay: show }),
}));

export default useTimelineStore; 