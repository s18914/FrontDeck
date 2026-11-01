---
title: Where does each of these console.log calls appear, in the server terminal or in the browser console?
category: nextjs
level: mid
tags: [server-components, output-prediction]
sources: []
---

```tsx
// app/page.tsx
import { LikeButton } from './like-button'

export default async function Page() {
  console.log('A: page render')
  return <LikeButton />
}

// app/like-button.tsx
'use client'
import { useEffect } from 'react'

export function LikeButton() {
  console.log('B: button render')
  useEffect(() => console.log('C: effect'), [])
  return <button onClick={() => console.log('D: click')}>Like</button>
}
```

<!-- answer -->

- **A**: **server only**. `Page` is a Server Component, and its code never runs in the browser.
- **B**: **both**. Client Components are also rendered on the server to produce the initial HTML, then run again in the browser during hydration and on every re-render.
- **C**: **browser only**. Effects never run during server rendering.
- **D**: **browser only**, when the user clicks.

The takeaway: "Client Component" doesn't mean "runs only in the browser". It means its code is **also shipped and hydrated** on the client. That's why anything touching `window` belongs in an effect or event handler, not in the render body.

Two details that confuse people:

- This route uses no request-time APIs, so it's **prerendered**. In production the server-side logs for A and B appear during `next build`, not on every request.
- In development, Next.js **replays server logs in the browser console** with a "Server" label. The code still ran on the server.
