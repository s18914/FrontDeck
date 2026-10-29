---
title: How do you use React context providers in an App Router application?
category: nextjs
level: mid
tags: [context, server-components]
sources: []
---

Server Components **can't create or read context**, so a provider must live in a **Client Component**. The usual pattern is a small `'use client'` providers file that accepts `children`, rendered from the root layout (which stays a Server Component).

```tsx
// app/providers.tsx
'use client'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
```

In `app/layout.tsx` you then render `<Providers>{children}</Providers>` inside `<body>`.

Why this doesn't turn the whole app into client code: `children` is passed **as a prop**, so the pages and layouts inside stay **Server Components**. Only the provider code ships to the browser.

Tips:

- Render providers **as deep as possible**: wrap `{children}`, not the whole `<html>`, so static parts stay easy to optimize.
- Create per-user objects like a `QueryClient` **inside** the component (with `useState`), not at module level, or requests on the server could share state.
- Server Components that need the same data should fetch it directly; memoization makes that cheap.
