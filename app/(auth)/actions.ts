'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createUser, getUserCredentialsByEmail } from '@/data/users'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import {
  createSession,
  setSessionCookie,
  getSessionToken,
  validateSessionToken,
  invalidateSession,
  deleteSessionCookie,
} from '@/lib/auth/session'
import {
  consumeLoginAttempt,
  getClientIp,
  resetLoginAttempts,
} from '@/lib/auth/rate-limit'

export type AuthFormState = {
  fieldErrors?: { email?: string[]; password?: string[] }
  formError?: string
  values?: { email: string }
}

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email('Enter a valid email address.')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128),
})

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email('Enter a valid email address.')),
  password: z.string().min(1, 'Enter your password.'),
})

// Hash of a throwaway password. Used when no user matches the email, so that
// verifyPassword still runs the full scrypt and the response takes the same
// time whether or not the account exists.
const DUMMY_HASH =
  'scrypt$131072$8$1$WmurSHTB/QvCX8VK8jULvg==$dZWme1jiDtevLFXGKX/1EAuXFqw1TRWlmnT0jz31eaRaDD1edNXfeFu422u6/WhSWPel5MF0oP83FDM6+3ZnoA=='

export async function signUp(
  prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return {
      fieldErrors: z.flattenError(result.error).fieldErrors,
      values: { email: String(formData.get('email') ?? '') },
    }
  }

  const { email, password } = result.data
  const passwordHash = await hashPassword(password)

  const userId = await createUser(email, passwordHash)

  if (userId === undefined) {
    return {
      formError: 'An account with this email already exists.',
      values: { email },
    }
  }

  const session = await createSession(userId)
  await setSessionCookie(session.token, session.expiresAt)

  redirect('/')
}

export async function signIn(
  prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return {
      fieldErrors: z.flattenError(result.error).fieldErrors,
      values: { email: String(formData.get('email') ?? '') },
    }
  }
  const { email, password } = result.data

  const ip = await getClientIp()

  if (!(await consumeLoginAttempt(email, ip)))
    return {
      formError: 'Too many sign-in attempts. Try again in 15 minutes.',
      values: { email },
    }

  const user = await getUserCredentialsByEmail(email)

  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH)

  if (!user || !valid) {
    return {
      formError: 'Invalid email or password.',
      values: { email: email },
    }
  }

  await resetLoginAttempts(email)
  const session = await createSession(user.id)
  await setSessionCookie(session.token, session.expiresAt)

  redirect('/')
}

export async function signOut() {
  const token = await getSessionToken()
  if (token) {
    const session = await validateSessionToken(token)
    if (session) await invalidateSession(session.id)
  }

  await deleteSessionCookie()
  redirect('/')
}
