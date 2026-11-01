---
title: What problems does TanStack Query solve compared to fetching in useEffect?
category: state-and-data
level: mid
tags: [data-fetching, caching]
sources: []
---

TanStack Query is a **server state cache**. Instead of every component fetching and storing its own copy, you describe data with a **query key** and a fetch function, and the library handles caching, sharing and keeping the data fresh.

What you get compared to a hand-written `useEffect` + `useState` fetch:

- **Caching and deduplication** — components using the same key share one request and one cached result.
- **Loading and error states** out of the box (`isPending`, `isError`, `isFetching`).
- **Stale-while-revalidate** — cached data is shown instantly and refreshed in the background.
- **Automatic refetching** on window focus, network reconnect or an interval.
- **Retries** with backoff for failed requests.
- **No race conditions** — out-of-order responses can't overwrite newer data.
- **Mutations and invalidation** to refresh related data after a write, plus optimistic updates.
- Pagination, infinite queries, prefetching and DevTools.

In a Next.js App Router app, Server Components cover much of the initial data loading. TanStack Query is still useful for **client-driven data**: polling, infinite scrolling, data that changes after user interaction, or highly interactive dashboards.
