import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'

import type { CurrentUserData } from '@/pages/api/current'

export const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR<CurrentUserData>('/api/current', fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}