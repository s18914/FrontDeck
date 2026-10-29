---
title: When should you use updateTag instead of revalidateTag?
category: nextjs
level: mid
tags: [caching, server-actions]
sources:
  - title: updateTag – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/functions/updateTag
---

Use **`updateTag`** when the user who made a change must **see it immediately**, the so-called **read-your-own-writes** case. It **expires** the tagged entries right away, so the next render in that flow loads fresh data instead of serving the old version.

```ts
'use server'
import { updateTag } from 'next/cache'

export async function renameDeck(id: string, name: string) {
  await requireDeckOwner(id)
  await db.deck.update({ where: { id }, data: { name } })
  updateTag(`deck-${id}`) // the refreshed page shows the new name
}
```

`revalidateTag(tag, 'max')` instead marks entries stale and refreshes them **in the background** (stale-while-revalidate). Someone may briefly see the old version. That's fine for a CMS article, but confusing when you just saved a form and your old value comes back.

The differences:

- **Where**: `updateTag` works **only in Server Actions**; `revalidateTag` also works in Route Handlers, such as webhooks.
- **Behavior**: immediate expiry versus stale-while-revalidate.
- **Use case**: forms, settings and user-generated content versus background refresh where a short delay is acceptable.

Neither should be confused with `refresh()`, which re-renders the current route for the client without invalidating any tagged data.
