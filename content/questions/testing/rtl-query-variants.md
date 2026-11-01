---
title: What is the difference between getBy, queryBy and findBy queries in React Testing Library?
category: testing
level: junior
tags: [dom, async]
sources: []
---

They differ in what happens when the element **isn't there**. **`getBy`** throws an error immediately, **`queryBy`** returns `null`, and **`findBy`** returns a **promise** that keeps retrying until the element appears or a timeout (1 second by default) is reached.

When to use each:

- **`getBy`** — the element should be in the DOM right now. This is the default choice.
- **`queryBy`** — only for asserting that something is **absent**.
- **`findBy`** — the element appears **asynchronously** (after a fetch, a timer, a state update).

```tsx
expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument()
expect(screen.queryByText('Loading…')).not.toBeInTheDocument()
expect(await screen.findByText('Order placed')).toBeInTheDocument()
```

Each has an **`*AllBy`** variant that returns an array. Note that `getBy` and `queryBy` both throw if **more than one** element matches.
