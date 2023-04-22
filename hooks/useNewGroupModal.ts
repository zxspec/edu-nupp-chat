import { create } from 'zustand'

type NewGroupModal = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useNewGroupModal = create<NewGroupModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))