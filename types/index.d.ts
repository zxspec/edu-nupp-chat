export type { PostWithUserAndComments } from '@/pages/api/posts'
export type OptionalString = string | null | undefined;
export type UserSecrets = {
    id: string
    files: string[]
    publicKey: string
    privateKey: string
}