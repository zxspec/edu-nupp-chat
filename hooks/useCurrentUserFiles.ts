import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher'
import { FileMeta } from '@/types'

export const useCurrentUserFiles = () => {
    const url = '/api/files'
    const { data, error, isLoading, mutate } = useSWR<FileMeta[]>(url, fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}