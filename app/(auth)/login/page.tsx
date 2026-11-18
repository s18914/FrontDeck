import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Sign in</h1>
      <LoginForm />
      <p className="mt-6 text-center text-sm">
        New to FrontDeck?{' '}
        <Link
          href="/register"
          className="font-medium text-primary-700 underline dark:text-primary-400"
        >
          Create an account
        </Link>
      </p>
    </>
  )
}
