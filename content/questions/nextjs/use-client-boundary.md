---
title: What exactly does the use client directive mark, and what ends up in the client bundle?
category: nextjs
level: mid
tags: [server-components, bundling]
sources:
  - title: use client – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/directives/use-client
---

`'use client'` marks a **boundary in the module graph**, not a single component. The file with the directive becomes a **client entry point**, and **every module it imports** (and every component it renders directly) is bundled for the client too. You don't repeat the directive in each child file.

```tsx
'use client' // must come first, above the imports
import { useState } from 'react'
import { formatDate } from '@/lib/format' // now part of the client bundle too
```

Consequences:

- Put `'use client'` **as low in the tree as possible** (a `LikeButton`, a `SearchBox`), not on a page or layout, or the whole subtree's code and dependencies ship to the browser.
- A component is "client" because of **where it's imported**, not where it's rendered. The same shared `Card` file can run as a Server Component in one place and be bundled for the client in another.
- Server Components passed **as `children` or other props** to a Client Component are **not** pulled into its module graph. They are rendered on the server and passed in as output.
- Client Components still **render on the server** for the initial HTML. The directive means "also ship, hydrate and run in the browser", not "browser only".
