---
title: Why must every Server Action check authentication, authorization and input on its own?
category: nextjs
level: mid
tags: [server-actions, auth]
sources:
  - title: How to think about data security in Next.js – Next.js docs
    url: https://nextjs.org/docs/app/guides/data-security
---

Because a Server Action is effectively a **public HTTP endpoint**. Anyone can send a **POST request with any arguments** to it, without going through your UI, your form, or the page where the button is hidden.

So inside every action:

1. **Authenticate**: read the session and reject if there's none.
2. **Authorize**: check that this user may do this to **this resource** (owns the deck, is an admin). Hiding a button is not authorization.
3. **Validate input**: arguments and `FormData` are untrusted. Parse them with a schema (Zod, Valibot) and enforce types, lengths and ranges.
4. **Return only what the client needs**, never full database rows.

Why other layers aren't enough:

- **Proxy** matches by path, and a matcher change or a moved action can silently skip it. Use it only for optimistic redirects.
- An auth check in a **page or layout** protects rendering, not the action. The action runs even if the page would never render for that user.
- **TypeScript types** disappear at runtime, so they validate nothing.

Next.js adds defense in depth (unguessable action IDs, removal of unused actions, origin checks against CSRF), but that is not access control.
