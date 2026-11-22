// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { hashPassword, verifyPassword } from './password'

vi.mock('server-only', () => ({}))

describe('hashPassword', () => {
  it('stores the algorithm and its parameters in the hash', async () => {
    const hash = await hashPassword('correct horse battery')
    expect(hash).toMatch(/^scrypt\$131072\$8\$1\$/)
  })

  it('gives a different hash each time for the same password', async () => {
    const hashA = await hashPassword('correct horse battery')
    const hashB = await hashPassword('correct horse battery')
    expect(hashA).not.toBe(hashB)
  })
})

describe('verifyPassword', () => {
  it('accepts the password the hash was made from', async () => {
    const hash = await hashPassword('correct horse battery')

    expect(await verifyPassword('correct horse battery', hash)).toBe(true)
  })

  it('rejects a wrong password', async () => {
    const hash = await hashPassword('correct horse battery')

    expect(await verifyPassword('wrong horse battery', hash)).toBe(false)
  })

  it('returns false for a malformed hash instead of throwing', async () => {
    expect(await verifyPassword('cokolwiek', 'not-a-hash')).toBe(false)
  })
})
