import { resolve } from 'node:path'

export const DATAFOLDER = resolve(process.cwd(), process.env.LOCAL_DATAFOLDER ?? 'data')
export const ENCRYPTION_ALGORITHM = 'aes-256-cbc'
export const INITIALIZATION_VECTOR = process.env.INITIALIZATION_VECTOR ?? '23ca408a8ff898aa'