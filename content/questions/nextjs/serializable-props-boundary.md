---
title: What kinds of props can a Server Component pass to a Client Component?
category: nextjs
level: mid
tags: [server-components]
sources:
  - title: use client directive – React docs
    url: https://react.dev/reference/rsc/use-client
---

Only values React can **serialize** into the RSC payload, because the props travel over the network from the server to the browser.

Allowed:

- primitives: string, number, bigint, boolean, `null`, `undefined`;
- plain objects and arrays of serializable values, `Date`, `Map`, `Set`, typed arrays;
- **Promises**, which the Client Component can unwrap with `use()`;
- **JSX**, including already-rendered Server Components;
- **Server Functions** marked with `'use server'`, which become references the client can call.

Not allowed:

- **regular functions**, such as an event handler defined in a Server Component;
- **class instances**, for example custom classes or ORM entities with methods;
- symbols that aren't registered globally.

```tsx
// Error: functions cannot be passed directly to Client Components
<SaveButton onSave={() => db.save(data)} />

// OK: pass a Server Action instead
<SaveButton onSave={saveDeck} />
```

Pitfall: everything you pass ends up **in the page source**. Passing a whole `user` row can leak fields like `passwordHash` or internal flags. Pass only the fields the client needs, ideally a small DTO built on the server.
