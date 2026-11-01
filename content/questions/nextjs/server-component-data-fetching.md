---
title: How do you fetch data in Server Components and avoid request waterfalls?
category: nextjs
level: mid
tags: [data-fetching, async]
sources:
  - title: Fetching Data – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/fetching-data
---

Server Components can be **`async`**, so you simply `await` data inside them, whether through `fetch`, an ORM or a database client. There's no `useEffect`, no manual loading state and no API route in between.

A **waterfall** happens when independent requests run **one after another**:

```tsx
const artist = await getArtist(id) // 300 ms
const albums = await getAlbums(id) // another 300 ms, although it didn't need artist
```

Ways to avoid it:

- **Start requests in parallel**: create the promises first, then `await Promise.all([...])`, or `Promise.allSettled` if one may fail.
- **Push fetching down** into the components that use the data and wrap them in `<Suspense>`. Sibling components then fetch **concurrently** and stream independently. Layouts and pages are rendered in parallel too.
- **Preload**: call the data function early without `await` (`void getItem(id)`) before other blocking work. A memoized function reuses that in-flight request later.

Sequential fetching is fine when one request **truly depends** on another, for example when you need `artist.id` to load playlists. In that case put the dependent part behind `<Suspense>` so the rest of the page isn't blocked.

Thanks to request memoization you also don't need to prop-drill fetched data. Fetch it where it's used.
