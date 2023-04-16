import { generateKeyPairSync, randomUUID, randomBytes, publicEncrypt } from 'node:crypto'
import { join } from 'node:path'
import { writeFile, readFile } from 'node:fs/promises'
import { UserSecrets } from '@/types'

import { DATAFOLDER } from '@/libs/constants'

const getUserFilePath = (userId: string) => join(DATAFOLDER, `${userId}.json`)

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
    const userJsonPath = getUserFilePath(userId)
    const userData: UserSecrets = {
        id: userId,
        files: [],
        publicKey,
        privateKey,
    }
    return writeFile(userJsonPath, JSON.stringify(userData))
}

export const getUserSecrets = async (userId: string): Promise<UserSecrets> => {
    const userJsonPath = getUserFilePath(userId)
    const rawUserData = await readFile(userJsonPath, 'utf-8')
    return JSON.parse(rawUserData) as UserSecrets
}

export const updateUserSecrets = async (secrets: UserSecrets) => {
    const userJsonPath = getUserFilePath(secrets.id)
    return writeFile(userJsonPath, JSON.stringify(secrets))
}



export const createFileMeta = async (fileName: string, ownerId: string, publicKey: string) => {
    const fileId = randomUUID()
    const fileJsonPath = join(DATAFOLDER, `${fileId}.json`)
    const fileSymEncryptionKey = randomBytes(32);
    const encryptedKey = publicEncrypt(publicKey, fileSymEncryptionKey)

    const fileMeta = {
        id: fileId,
        name: fileName,
        owner: ownerId,
        users: {
            [ownerId]: encryptedKey.toString('hex'),
            // user1Id: encryptedKey,
            // user2Id: encryptedKey,
            // ...
        },
        groups: {}
    }

    await writeFile(fileJsonPath, JSON.stringify(fileMeta))

    return fileMeta
}
