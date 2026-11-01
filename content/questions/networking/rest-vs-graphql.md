---
title: What are the trade-offs between REST and GraphQL APIs?
category: networking
level: mid
tags: [data-fetching, http, caching]
sources: []
---

**REST** exposes **many resource URLs** (`/users/1`, `/users/1/posts`) whose response shape is decided by the server. **GraphQL** exposes **one endpoint** with a typed schema, and the **client describes exactly which fields** it needs in a query.

Where GraphQL wins:

- **No over-fetching or under-fetching** — one query can return a user, their posts and comment counts, instead of several REST round trips.
- A **strongly typed schema** that enables code generation for TypeScript types.
- Frontend teams can evolve data needs **without new endpoints**.

Where REST wins:

- **HTTP caching is simple** — each `GET` URL can be cached by the browser and CDN. GraphQL usually sends `POST` to one URL, so it relies on client caches (Apollo, urql) or persisted queries.
- **Simpler server and tooling**, status codes carry meaning (GraphQL often returns 200 with an `errors` array).
- Fewer performance traps: GraphQL servers must guard against **N+1 queries** and **expensive nested queries** (depth and cost limits).

Rule of thumb: GraphQL pays off with **many clients and complex, connected data**; REST is often enough for simple CRUD.
