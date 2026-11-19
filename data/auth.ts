import 'server-only'
import { cache } from 'react'
import { getSessionToken, validateSessionToken } from '@/lib/auth/session'

export const verifySession = cache(async () => {
  const token = await getSessionToken()

  if (!token) return null

  const session = await validateSessionToken(token)
  if (!session) return null

  return { userId: session.userId }
})
