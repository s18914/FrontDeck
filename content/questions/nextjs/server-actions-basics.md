---
title: What are Server Actions and how do you invoke them?
category: nextjs
level: mid
tags: [server-actions, forms]
sources:
  - title: Mutating Data – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/mutating-data
---

A **Server Action** is an async function marked with **`'use server'`** that runs on the server but can be **called from the client**. Next.js exposes it through a **POST** request behind the scenes, and the response can carry both the result and the updated UI in one round trip.

Defining one:

- inline in a Server Component, with `'use server'` as the first line of the function body, or
- in a separate file with `'use server'` at the top: every export becomes an action that Client Components can import.

Invoking it:

- **`<form action={createDeck}>`**: the action receives `FormData`, and the form works even **before JavaScript loads** (progressive enhancement);
- `<button formAction={...}>` for a specific submit button;
- from **event handlers** in Client Components, usually inside `startTransition`;
- with **`useActionState`** to get the returned state (validation errors) and a `pending` flag.

```ts
'use server'
export async function createDeck(formData: FormData) {
  const user = await requireUser()
  const name = z.string().min(1).parse(formData.get('name'))
  await db.deck.create({ data: { name, ownerId: user.id } })
  revalidatePath('/decks')
}
```

The client dispatches actions **one at a time**, so they're meant for mutations, not for parallel data fetching.
