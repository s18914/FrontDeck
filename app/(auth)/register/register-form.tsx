'use client'

import { buttonClasses } from '@/components/ui/button'

const fieldClasses =
  'h-10 w-full rounded-md border-2 border-gray-500 bg-transparent px-3 text-sm dark:border-gray-400'

export function RegisterForm() {
  return (
    <form className="grid gap-4">
      <label className="grid gap-1 text-sm font-medium">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className={fieldClasses}
        />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Password
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          className={fieldClasses}
        />
        <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
          At least 8 characters.
        </span>
      </label>

      <button
        type="submit"
        className={`${buttonClasses({ variant: 'gradient' })} mt-2 w-full`}
      >
        Create account
      </button>
    </form>
  )
}
