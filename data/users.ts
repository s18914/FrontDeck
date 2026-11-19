import 'server-only'
import { db } from '@/db'
import { userTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

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
