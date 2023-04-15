import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'

import type { SingleUserData } from '@/pages/api/users/[userId]'

export const useUser = (userId: string) => {
    const { data, error, isLoading, mutate } = useSWR<SingleUserData>(userId ? `/api/users/${userId}` : null, fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}