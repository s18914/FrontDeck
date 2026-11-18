import type { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: 'Create account',
}

export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Create account</h1>
      <RegisterForm />
      <p className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-primary-700 underline dark:text-primary-400"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}
