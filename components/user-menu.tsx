import Link from 'next/link'
import { buttonClasses } from './ui/button'
import { getCurrentUser } from '@/data/users'
import { signOut } from '@/app/(auth)/actions'

export async function UserMenu() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className={buttonClasses({ variant: 'ghost', size: 'sm' })}
        >
          Sign in
        </Link>
        <Link href="/register" className={buttonClasses({ size: 'sm' })}>
          Create account
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden max-w-48 truncate text-sm text-gray-700 sm:inline dark:text-gray-300">
        {user.email}
      </span>
      <form action={signOut}>
        <button
          type="submit"
          className={buttonClasses({ variant: 'ghost', size: 'sm' })}
        >
          Sign out
        </button>
      </form>
    </div>
  )
}
