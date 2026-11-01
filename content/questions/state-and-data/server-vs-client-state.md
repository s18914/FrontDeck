---
title: What is the difference between server state and client state?
category: state-and-data
level: junior
tags: [state, data-fetching]
sources: []
---

**Server state** is data that lives on a server and that the UI only holds a **copy** of: users, products, orders. **Client state** exists only in the browser and the app fully owns it: an open modal, the active tab, a draft in an input, the theme.

Why the split matters:

- Server state is **asynchronous** and can become **stale**, because someone else can change it at any time. It needs loading and error states, caching, refetching and invalidation.
- Client state is **synchronous** and always correct, because nothing outside the app can change it.

A common mistake is putting fetched data into a global store such as Redux and hand-writing loading flags, cache logic and refetching. Today you usually handle server state with a **data-fetching library** (TanStack Query, SWR) or Server Components, and keep the remaining client state small and local.
