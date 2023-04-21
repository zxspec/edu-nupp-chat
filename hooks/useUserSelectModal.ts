import { create } from 'zustand'

type UserSelectStore = {
    isOpen: boolean
    fileId: string
    onOpen: (fileId: string) => void
    onClose: () => void
}

export const useUserSelectModal = create<UserSelectStore>((set) => ({
    isOpen: false,
    fileId: '',
    onOpen: (fileId: string) => set({ isOpen: true, fileId }),
    onClose: () => set({ isOpen: false, fileId: '' })
}))