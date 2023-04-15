import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'

import type { Users } from '@/pages/api/users'

export const useUsers = () => { // TODO simplify return as it is
    const { data, error, isLoading, mutate } = useSWR<Users>('/api/users', fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}