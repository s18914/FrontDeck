---
title: What happens when a component in the app directory uses useState without the use client directive?
category: nextjs
level: junior
tags: [server-components, hooks, output-prediction]
sources: []
---

```tsx
// app/counter.tsx
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

```tsx
// app/page.tsx
import Counter from './counter'

export default function Page() {
  return <Counter />
}
```

<!-- answer -->

You get an **error** in the dev overlay and in `next build`, not a working counter. `counter.tsx` has no `'use client'` and is imported from a Server Component, so it is treated as a **Server Component**. `useState` and `onClick` only work in Client Components, and Next.js tells you to mark the file with `"use client"`.

The fix is one line at the very top of `counter.tsx`, above the imports:

```tsx
'use client'
import { useState } from 'react'
```

Now `Counter` is a client entry point, while `page.tsx` stays a Server Component that simply renders it.

You could also put `'use client'` in `page.tsx`, but then the whole page and everything it imports ships to the browser. Mark the **smallest interactive leaf** instead.
