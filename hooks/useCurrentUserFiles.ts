import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher'
import { FileInfo } from '@/types'

export const useCurrentUserFiles = () => {
    const url = '/api/files'
    const { data, error, isLoading, mutate } = useSWR<FileInfo[]>(url, fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}