import { create} from 'zustand';

import { User as UserType} from '@/generated/prisma'

type AuthStore = {
    currentUser: UserType | null;
    setCurrentUser: (currentUser: UserType | null) => void;
}

export const useUser = create<AuthStore>((set) => ({
    currentUser:null,
    setCurrentUser: (currentUser) => set({currentUser})
}))

