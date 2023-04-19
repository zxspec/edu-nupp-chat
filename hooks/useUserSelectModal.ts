import { create } from 'zustand'

type UserSelectStore = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useUserSelectModal = create<UserSelectStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))