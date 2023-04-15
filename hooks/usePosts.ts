import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'

import type { PostWithUserAndComments } from '@/pages/api/posts'

export const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'
    const { data, error, isLoading, mutate } = useSWR<PostWithUserAndComments[]>(url, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}