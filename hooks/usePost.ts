import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'

import type { PostWithNestedFields } from '@/pages/api/posts/[postId]'

export const usePost = (postId: string) => {
    const url = postId ? `/api/posts/${postId}` : null

    const { data, error, isLoading, mutate } = useSWR<PostWithNestedFields | null>(url, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}