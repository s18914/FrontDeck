import 'server-only'
import { db } from '@/db'
import { userTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { verifySession } from './auth'

export async function createUser(email: string, passwordHash: string) {
  const newUser = await db
    .insert(userTable)
    .values({ email, passwordHash })
    .onConflictDoNothing({ target: userTable.email })
    .returning({ id: userTable.id })
  return newUser[0]?.id
}

export async function getUserCredentialsByEmail(email: string) {
  const user = await db
    .select({ id: userTable.id, passwordHash: userTable.passwordHash })
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1)

  return user[0] ?? undefined
}

export async function getCurrentUser() {
  const session = await verifySession()
  if (!session) return null
  const rows = await db
    .select({ email: userTable.email })
    .from(userTable)
    .where(eq(userTable.id, session.userId))
    .limit(1)
  return rows[0] ?? null
}
