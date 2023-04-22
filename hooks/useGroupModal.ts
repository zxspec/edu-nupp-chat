import { GroupInfo } from '@/types'
import { create } from 'zustand'

type GroupModal = {
    isOpen: boolean
    id: string
    name: string
    ownerId: string
    userIds: string[]
    onOpen: (groupInfo: GroupInfo) => void
    onClose: () => void
}

export const useGroupModal = create<GroupModal>((set) => ({
    isOpen: false,
    id: '',
    name: '',
    ownerId: '',
    userIds: [],
    onOpen: ({ id, name, owner, users }) => set({ isOpen: true, id, name, ownerId: owner, userIds: [...users] }),
    onClose: () => set({ isOpen: false })
}))