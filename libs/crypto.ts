import { generateKeyPairSync } from 'node:crypto'
import { join } from 'node:path'
import { writeFile, readFile } from 'node:fs/promises'
import { UserSecrets } from '@/types'

const DATAFOLDER = 'data'

export const generateUserKeys = (passphrase: string) => {
    return generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase
        }
    });
}

export const createUserSecrets = (userId: string, publicKey: string, privateKey: string) => {
    const userJsonPath = join(process.cwd(), DATAFOLDER, `${userId}.json`)
    const userData = {
        id: userId,
        files: [],
        publicKey,
        privateKey,
    }
    return writeFile(userJsonPath, JSON.stringify(userData))
}

export const getUserSecrets = async (userId: string): Promise<UserSecrets> => {
    const userJsonPath = join(process.cwd(), DATAFOLDER, `${userId}.json`)
    const rawUserData = await readFile(userJsonPath, 'utf-8')
    return JSON.parse(rawUserData) as UserSecrets
}