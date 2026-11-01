---
title: How do you prefetch query data on the server and hydrate it into the client cache?
category: state-and-data
level: senior
tags: [hydration, data-fetching, server-components, caching]
sources:
  - title: Advanced Server Rendering – TanStack Query docs
    url: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
---

On the server you create a **fresh QueryClient per request**, **prefetch** the queries the page needs, **dehydrate** the cache into serializable data and send it with the HTML. On the client, a **hydration boundary** puts that data into the browser's QueryClient, so `useQuery` with the same key finds it immediately — **no loading state and no duplicate request**.

```tsx
// app/posts/page.tsx (Server Component)
export default async function PostsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getPosts })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts /> {/* Client Component, useQuery with the same key */}
    </HydrationBoundary>
  )
}
```

Things that matter in practice:

- **Keys must match exactly** between server prefetch and client `useQuery`, or the client fetches again. Shared query option factories help.
- Set a **`staleTime` above 0** on the client. With the default of 0, data that just arrived from the server is already stale and is **refetched right after hydration**.
- Never share one QueryClient **between requests** on the server, because users would see each other's data. On the client, create it once (for example with `useState`).
- Data must be **serializable**. Dates and class instances need care.
- You can stream: start a prefetch without `await` and configure dehydration to **include pending queries**, so Suspense boundaries fill in as data arrives.

When to use it: when Client Components need the data for **client-side features** (refetching, mutations, infinite scroll). If the data is only displayed, passing it as props from a Server Component is simpler.
