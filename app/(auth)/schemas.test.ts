import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from './schemas'

describe('registerSchema', () => {
  it('trims and lowercases the email', () => {
    const result = registerSchema.safeParse({
      email: '  Kasia@Example.COM  ',
      password: 'long-enough',
    })

    expect(result.success).toBe(true)
    expect(result.data?.email).toBe('kasia@example.com')
  })

  it('rejects an invalid email', () => {
    const result = registerSchema.safeParse({
      email: '  KasiaExample.COM  ',
      password: 'long-enough',
    })

    expect(result.success).toBe(false)
  })

  it('requires a password of at least 8 characters', () => {
    const tooShort = registerSchema.safeParse({
      email: 'kasia@example.com',
      password: 'qwerty1',
    })
    const longEnough = registerSchema.safeParse({
      email: 'kasia@example.com',
      password: 'qwerty12',
    })

    expect(tooShort.success).toBe(false)
    expect(longEnough.success).toBe(true)
  })
})

describe('loginSchema', () => {
  it('rejects an empty password', () => {
    const result = loginSchema.safeParse({
      email: 'kasia@example.com',
      password: '',
    })

    expect(result.success).toBe(false)
  })

  it('accepts a short password, because sign-in does not check password strength', () => {
    const result = loginSchema.safeParse({
      email: 'kasia@example.com',
      password: 'qwerty1',
    })

    expect(result.success).toBe(true)
  })
})
