'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createUser } from '@/data/users'
import { hashPassword } from '@/lib/auth/password'
import { createSession, setSessionCookie } from '@/lib/auth/session'

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
