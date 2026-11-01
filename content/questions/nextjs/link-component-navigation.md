---
title: Why should you use the Link component instead of a plain anchor tag in Next.js?
category: nextjs
level: junior
tags: [routing]
sources:
  - title: Linking and Navigating – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/linking-and-navigating
---

`<Link>` from `next/link` enables **client-side navigation**: instead of a full page reload, Next.js fetches only what the new route needs (its RSC payload) and swaps it in, **keeping shared layouts and their state**.

Benefits over a plain `<a>`:

- **Prefetching**: in production, links are prefetched when they enter the viewport, so by the time the user clicks, the route (or at least its layout and `loading.tsx` fallback) is already in the browser.
- **No full reload**: client state and shared UI survive, and scrolling is handled for you.
- It still renders a real `<a href>`, so it stays **accessible and crawlable** and supports "open in new tab".

```tsx
import Link from 'next/link'

<Link href="/decks">Decks</Link>
<Link href="/archive" prefetch={false}>Archive</Link>
```

Use a plain `<a>` for **external** sites. For navigation triggered from code, for example in an event handler, use `useRouter().push()`.
