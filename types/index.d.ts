export type { PostWithUserAndComments } from '@/pages/api/posts'
export type OptionalString = string | null | undefined;
export type UserSecrets = {
    id: string
    files: Array<{ filePath: string, filename: string }>
    publicKey: string
    privateKey: string
}
export type FileInfo = {
    id: string
    filename: string
}