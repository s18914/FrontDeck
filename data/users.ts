import 'server-only'
import { db } from '@/db'
import { userTable } from '@/db/schema'

export async function createUser(email: string, passwordHash: string) {
  const newUser = await db
    .insert(userTable)
    .values({ email, passwordHash })
    .onConflictDoNothing({ target: userTable.email })
    .returning({ id: userTable.id })
  return newUser[0]?.id
}
