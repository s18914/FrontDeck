---
title: What does it mean to normalize state shape, and when is it worth doing?
category: state-and-data
level: senior
tags: [state, objects]
sources:
  - title: Normalizing State Shape – Redux docs
    url: https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
---

Normalizing means storing each entity type **like a database table**: items **keyed by id**, with other entities referencing them **by id** instead of nesting copies. It removes duplication, so every entity has **one source of truth**.

```ts
type State = {
  users: { byId: Record<string, User>; allIds: string[] }
  posts: { byId: Record<string, Post & { authorId: string }>; allIds: string[] }
}
```

Problems it solves with nested API data such as posts → comments → authors:

- The same user appears in many places. Renaming them means **finding and updating every copy**, and missing one gives an inconsistent UI.
- Updating a deeply nested item requires copying every level above it, which is verbose and **creates new references** that re-render unrelated components.
- Looking up an item by id is **O(1)** instead of searching arrays.

Costs and trade-offs:

- Components need the nested shape back, so you write **memoized selectors** to denormalize, or let each list item select its own entity by id (which also narrows re-renders).
- Extra code for normalizing responses. Redux Toolkit's **`createEntityAdapter`** generates the `ids`/`entities` structure and CRUD reducers.

When it's worth it: a **client-side store** holding relational data that is edited in many places — editors, chat apps, offline-first apps. When it isn't: server data in **TanStack Query**, which caches per query and keeps consistency through **invalidation** and refetching. Normalizing that cache by hand usually adds complexity for little gain.
