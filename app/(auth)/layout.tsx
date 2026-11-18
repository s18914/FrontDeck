import Link from 'next/link'

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className="relative isolate flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div aria-hidden className="bg-brand-gradient absolute inset-0 -z-10" />
      <Link
        href="/"
        className="mb-8 text-2xl font-bold tracking-tight text-white"
      >
        FrontDeck
      </Link>
      <main className="w-full max-w-sm rounded-xl bg-background p-8 shadow-lg dark:bg-dark-elevated">
        {children}
      </main>
    </div>
  )
}
