import axios from "axios"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import { useCurrentUser } from "./useCurrentUser"
import { useLoginModal } from "./useLoginModal"
import { usePost } from "./usePost"
import { usePosts } from "./usePosts"

type Props = {
    postId: string
    userId: string
}

export const useLike = ({ postId, userId }: Props) => {
    const { data: currentUser } = useCurrentUser()
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
    const { mutate: mutateFetchedPosts } = usePosts(userId)

    const loginModal = useLoginModal()

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds ?? []
        return list.includes(currentUser?.id ?? '')
    }, [currentUser?.id, fetchedPost?.likedIds])

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            const request = hasLiked ?
                () => axios.delete('/api/like', { data: { postId } }) :
                () => axios.post('/api/like', { postId })

            await request()

            mutateFetchedPost()
            mutateFetchedPosts()
            toast.success('Success')
        } catch (err) {
            toast.error('Something went wrong')
        }
    }, [currentUser, hasLiked, loginModal, mutateFetchedPost, mutateFetchedPosts, postId])

    return { hasLiked, toggleLike }
}