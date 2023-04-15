import { generateKeyPairSync } from 'node:crypto'
import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'

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

export const createUserSecrets = (id: string, publicKey: string, privateKey: string) => {
    const userJsonPath = join(process.cwd(), DATAFOLDER, `${id}.json`)
    const userData = {
        id,
        files: [],
        publicKey,
        privateKey,
    }
    return writeFile(userJsonPath, JSON.stringify(userData))
}