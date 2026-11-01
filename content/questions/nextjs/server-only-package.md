---
title: How do you make sure server-only code and secrets never end up in the client bundle?
category: nextjs
level: mid
tags: [server-components, modules]
sources:
  - title: Server and Client Components – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/server-and-client-components
---

The default helps: only `NEXT_PUBLIC_` variables are inlined into client code, and the rest become empty strings there. But that protects only the **value**. A shared module that reads `process.env.API_KEY` can still be **imported into a Client Component by accident**, and then its logic ships to the browser and silently breaks.

Guardrails:

- Add **`import 'server-only'`** at the top of modules that touch secrets, the database or internal APIs. If anything in the client module graph imports such a module, the **build fails** with a clear error.
- The mirror package, **`client-only`**, marks code that needs `window` and must never run on the server.
- Keep data access in a dedicated **data access layer** marked `server-only`. It checks auth and returns **minimal DTOs**, not raw rows.
- Watch what you pass as **props to Client Components**, because props are serialized into the page.

```ts
// lib/dal.ts
import 'server-only'

export async function getDeckForUser(id: string) {
  const user = await requireUser()
  return db.deck.findFirst({
    where: { id, ownerId: user.id },
    select: { id: true, name: true },
  })
}
```
