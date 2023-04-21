import useSWR from 'swr'
import { fetcher } from "@/libs/fetcher"
import type { FileShareInfo } from "@/types"

export const useFileShareInfo = (fileId: string) => {
    const { data, error, isLoading, mutate } = useSWR<FileShareInfo>(`/api/share/${fileId}`, fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}