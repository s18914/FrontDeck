'use client'

import { buttonClasses } from '@/components/ui/button'
import { useActionState } from 'react'
import { type AuthFormState, signUp } from '../actions'

const initialState: AuthFormState = {}

const fieldClasses =
  'h-10 w-full rounded-md border-2 border-gray-500 bg-transparent px-3 text-sm dark:border-gray-400'

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState)

  return (
    <form className="grid gap-4" action={formAction}>
      <label className="grid gap-1 text-sm font-medium">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={state.values?.email}
          required
          className={fieldClasses}
        />
      </label>
      {state.fieldErrors?.email && (
        <p className="text-sm text-red-700 dark:text-red-400">
          {state.fieldErrors.email[0]}
        </p>
      )}

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
      {state.fieldErrors?.password && (
        <p className="text-sm text-red-700 dark:text-red-400">
          {state.fieldErrors.password[0]}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={`${buttonClasses({ variant: 'gradient' })} mt-2 w-full`}
      >
        {isPending ? 'Creating account…' : 'Create account'}
      </button>
      {state.formError && (
        <p className="text-sm text-red-700 dark:text-red-400">
          {state.formError}
        </p>
      )}
    </form>
  )
}
