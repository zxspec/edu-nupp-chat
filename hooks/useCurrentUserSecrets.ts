import useSWR from 'swr'
import { fetcher } from "@/libs/fetcher"
import type { UserSecrets } from "@/types"

export const useCurrentUserSecrets = () => {
    const { data, error, isLoading, mutate } = useSWR<UserSecrets>('/api/secrets', fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}