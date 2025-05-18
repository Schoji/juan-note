import { create } from 'zustand';

interface SyncStore {
  syncStatus: string;
  setSyncStatus: (status: string) => void;
}

export const useSyncStore = create<SyncStore>((set) => ({
  syncStatus: 'Synced',
  setSyncStatus: (status: string) => set({ syncStatus: status }),
}));