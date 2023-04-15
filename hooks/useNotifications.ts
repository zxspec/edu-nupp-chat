import useSWR from 'swr'

import { fetcher } from '@/libs/fetcher'
import type { Notification } from '@prisma/client';

export const useNotifications = (userId?: string) => {
    const url = userId ? `/api/notifications/${userId}` : null
    const { data, error, isLoading, mutate } = useSWR<Notification[]>(url, fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}