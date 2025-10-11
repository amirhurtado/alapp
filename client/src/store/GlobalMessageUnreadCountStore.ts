import {create} from 'zustand';

type GlobalMessageUnreadCountStore = {
    count: number;
    increment: () => void;
    reset: () => void;
    setCount: (count: number) => void;
    decrement: (amount: number) => void;
};


export const useGlobalMessageUnreadCount = create<GlobalMessageUnreadCountStore>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    reset: () => set({ count: 0 }),
    setCount: (count) => set({ count }),
    decrement: (amount) =>
    set((state) => ({ count: Math.max(0, state.count - amount) })),
}))  