import axios from "axios"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"
import { useCurrentUser } from "./useCurrentUser"
import { useLoginModal } from "./useLoginModal"
import { useUser } from "./useUser"

export const useFollow = (userId: string) => {
    const { data: currentUser, error, isLoading, mutate: mutateCurrentUser } = useCurrentUser()
    const { mutate: mutateFetchedUser } = useUser(userId)

    const loginModal = useLoginModal()

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds ?? []

        return list.includes(userId)
    }, [currentUser?.followingIds, userId])

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            loginModal.onOpen()
            return
        }

        try {
            const request = isFollowing ?
                () => axios.delete('/api/follow', { data: { userId } }) :
                () => axios.post('/api/follow', { userId })
            await request()

            mutateCurrentUser()
            mutateFetchedUser()

            toast.success(isFollowing ? 'Unfollowed' : 'Followed')
        } catch (err) {
            toast.error('Something went wrong')
        }
    }, [currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchedUser, userId])

    return { isFollowing, toggleFollow }
}