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

export type FileMeta = FileInfo & {
    owner: string,
    users: Record<string, string>
    groups: Record<string, string>
}

export type FileShareInfo = {
    owner: string
    users: string[]
    groups: string[]
}

export type GroupInfo = {
    id: string
    name: string
    owner: string
    users: string[]
}