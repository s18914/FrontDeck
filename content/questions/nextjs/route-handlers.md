---
title: How do Route Handlers work in the App Router?
category: nextjs
level: mid
tags: [http]
sources:
  - title: Route Handlers – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/route-handlers
---

A Route Handler is a `route.ts` file inside `app/` that **exports one function per HTTP method**. It uses the standard Web **`Request` and `Response`** APIs, extended by Next.js as `NextRequest` and `NextResponse`.

```ts
// app/api/decks/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const deck = await getDeck(id)
  if (!deck) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(deck)
}
```

Rules worth knowing:

- Supported methods are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` and `OPTIONS`; any other method gets **405**.
- A `route.ts` **can't sit in the same segment as a `page.tsx`**, because both would own the URL. That's why `app/api/...` is a common convention.
- Route Handlers don't use layouts and don't take part in client-side navigation.
- `params` in the second argument is a **Promise**, just like in pages.
- They are **not cached by default**. In the previous model a `GET` can opt into static output with `export const dynamic = 'force-static'`. With Cache Components, a `GET` that reads no request data is prerendered, and uncached work can move into a `'use cache'` helper.
