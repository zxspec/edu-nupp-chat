import { generateKeyPairSync, randomUUID, randomBytes, publicEncrypt } from 'node:crypto'
import { join, basename } from 'node:path'
import { writeFile, readFile, rm } from 'node:fs/promises'
import { UserSecrets, FileMeta, FileInfo } from '@/types'

import { DATAFOLDER } from '@/libs/constants'

const getFilePath = (fileId: string) => join(DATAFOLDER, fileId)
const getMetaFilePath = (fileId: string) => join(DATAFOLDER, `${fileId}.json`)
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
    const fileMetaPath = getMetaFilePath(fileId)
    const fileSymEncryptionKey = randomBytes(32);
    const encryptedKey = publicEncrypt(publicKey, fileSymEncryptionKey)

    const fileMeta: FileMeta = {
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

    await writeFile(fileMetaPath, JSON.stringify(fileMeta))

    return fileMeta
}

export const getFileMeta = async (fileId: string) => {
    const fileMetaPath = getMetaFilePath(fileId)
    const rawFileMeta = await readFile(fileMetaPath, 'utf-8')
    return JSON.parse(rawFileMeta.toString()) as FileMeta
}

// TODO check if userId is enough here
export const getUserFiles = async (secrets: UserSecrets): Promise<FileInfo[]> => {
    const userJsonPath = getUserFilePath(secrets.id)
    const rawUserData = await readFile(userJsonPath, 'utf-8')
    const { files } = JSON.parse(rawUserData) as UserSecrets
    return files.map(({ filePath, filename }) => {
        return {
            id: basename(filePath),
            filename,
        }
    })
}

export const deleteUserFile = async (fileId: string, secrets: UserSecrets) => {
    const filePath = getFilePath(fileId)
    const fileMetaPath = getMetaFilePath(fileId)
    const fileMeta = await getFileMeta(fileId)

    if (fileMeta.owner === secrets.id) {
        await rm(filePath)
        await rm(fileMetaPath)

        secrets.files = secrets.files.filter((f) => f.filePath !== filePath)
        await updateUserSecrets(secrets)
    } else {
        throw new Error('You are not the owner of this file')
    }
}