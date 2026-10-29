---
title: How do redirect() and notFound() work, and why shouldn't you call them inside try/catch?
category: nextjs
level: mid
tags: [routing, error-handling]
sources:
  - title: redirect – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/functions/redirect
---

Both are **control-flow functions** from `next/navigation` that **throw a special error**, which Next.js catches higher up:

- **`redirect('/login')`** stops rendering and sends the user elsewhere: a **307** in Server Components and Route Handlers, a client-side navigation from a Server Action (or a **303** for forms submitted without JavaScript). `permanentRedirect` uses **308**.
- **`notFound()`** stops rendering and shows the nearest `not-found.tsx` with a **404**.

These status codes apply only if the call happens **before the response starts streaming**. Once a Suspense fallback (including `loading.tsx`) has been sent, the status is already 200: `redirect` becomes a client-side redirect and `notFound()` adds a `noindex` meta tag. When the status code matters, keep the check outside any Suspense boundary.

Their return type is `never`, so code after them doesn't run and TypeScript narrows types:

```tsx
const deck = await getDeck(id)
if (!deck) notFound()
return <DeckView deck={deck} /> // deck is non-null here
```

The **try/catch pitfall**: because they throw, a surrounding `catch` swallows the redirect and nothing happens.

```ts
try {
  await db.deck.create({ data })
  redirect('/decks') // caught below, the redirect is lost
} catch {
  return { error: 'Could not save' }
}
```

Call them **after** the `try` block. Also call `revalidatePath` or `updateTag` **before** `redirect`, since nothing after it runs.

`redirect` also works while rendering a Client Component, but **not in event handlers**. Use `useRouter().push()` there.
