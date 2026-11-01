---
title: How can a Client Component render a Server Component inside it?
category: nextjs
level: mid
tags: [server-components, component-patterns]
sources: []
---

It can't **import** one, because any module imported into a client file becomes client code. Instead, a parent Server Component **passes the Server Component as `children` (or another JSX prop)**, and the Client Component just places that slot in its output.

```tsx
// cart-drawer.tsx
'use client'
import { useState } from 'react'

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return open ? <aside>{children}</aside> : <button onClick={() => setOpen(true)}>Cart</button>
}

// page.tsx (Server Component)
<CartDrawer>
  <CartItems /> {/* async, reads the DB on the server */}
</CartDrawer>
```

Why it works: `<CartItems />` is rendered **on the server first**. The RSC payload contains its finished output plus a placeholder for `CartDrawer`, so the Client Component receives ready-made UI. `CartItems` keeps its server-only abilities: database access, secrets and zero client JavaScript.

Common uses: **context providers** wrapping the app, modals, tabs, accordions and animated containers around server-rendered content.

Limitation: the Client Component can't call, inspect or pass new props to that Server Component. It can only decide **whether and where** to render the slot it was given.
