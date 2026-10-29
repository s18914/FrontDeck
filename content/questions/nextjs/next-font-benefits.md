---
title: What problems does next/font solve?
category: nextjs
level: junior
tags: [styling, web-vitals]
sources:
  - title: Font Optimization – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/fonts
---

`next/font` **self-hosts fonts** and optimizes how they load, so you get custom typography without the usual performance and privacy costs.

- **No requests to Google at runtime**: Google Fonts are downloaded at build time and served from your own domain, which is better for privacy and saves an extra connection.
- **No layout shift**: it generates a fallback font with adjusted metrics, so text doesn't jump when the web font swaps in.
- **Only what you need**: you declare subsets and weights; variable fonts are recommended.
- **Scoped**: a font applies only where you use its `className` or CSS `variable`; put it on the root layout to apply it globally.

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

For your own font files, use `next/font/local` with a `src` path.
