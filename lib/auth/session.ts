import 'server-only'
import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { and, eq, gt } from 'drizzle-orm'
import { db } from '@/db'
import { sessionTable } from '@/db/schema'

const SESSION_COOKIE = 'session'
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000

function generateSessionToken(): string {
  return randomBytes(32).toString('base64url')
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

// --- Database ---

export async function createSession(userId: string) {
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)
  const tokenHash = hashToken(token)
  await db.insert(sessionTable).values({ userId, tokenHash, expiresAt })
  return { token, expiresAt }
}

export async function validateSessionToken(token: string) {
  const tokenHash = hashToken(token)
  const rows = await db
    .select({ id: sessionTable.id, userId: sessionTable.userId })
    .from(sessionTable)
    .where(
      and(
        eq(sessionTable.tokenHash, tokenHash),
        gt(sessionTable.expiresAt, new Date()),
      ),
    )
    .limit(1)

  return rows[0]
}

export async function invalidateSession(sessionId: string) {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
}

// --- Cookie ---

export async function setSessionCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  })
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
