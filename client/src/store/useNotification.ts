import { create } from "zustand";

type NotificationCountStore = {
  count: number;
  increment: () => void;
  reset: () => void;
  setCount: (count: number) => void;
};

export const useNotificationCount = create<NotificationCountStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count) => set({ count }),
}));
