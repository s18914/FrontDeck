import 'server-only'
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

const SCRYPT_N = 2 ** 17
const SCRYPT_R = 8
const SCRYPT_P = 1
const KEY_LENGTH = 64
const SALT_LENGTH = 16

function deriveKey(
  password: string,
  salt: Buffer,
  n: number,
  r: number,
  p: number,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      KEY_LENGTH,
      { N: n, r: r, p: p, maxmem: 256 * n * r },
      (err, derivedKey) => {
        if (err) reject(err)
        else resolve(derivedKey)
      },
    )
  })
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH)
  const key = await deriveKey(password, salt, SCRYPT_N, SCRYPT_R, SCRYPT_P)
  return [
    'scrypt',
    SCRYPT_N,
    SCRYPT_R,
    SCRYPT_P,
    salt.toString('base64'),
    key.toString('base64'),
  ].join('$')
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.split('$')
  if (parts.length !== 6 || parts[0] !== 'scrypt') {
    return false
  }

  const [, nText, rText, pText, salt, key] = parts
  const n = Number(nText)
  const r = Number(rText)
  const p = Number(pText)

  if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p))
    return false

  const saltBuffer = Buffer.from(salt, 'base64')
  const keyBuffer = Buffer.from(key, 'base64')

  const check = await deriveKey(password, saltBuffer, n, r, p)

  if (check.length !== keyBuffer.length) return false
  return timingSafeEqual(keyBuffer, check)
}
