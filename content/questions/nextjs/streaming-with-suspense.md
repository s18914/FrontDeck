---
title: How does streaming work in the App Router, and when do you use loading.tsx versus your own Suspense boundaries?
category: nextjs
level: mid
tags: [suspense, rendering]
sources:
  - title: Streaming – Next.js docs
    url: https://nextjs.org/docs/app/guides/streaming
---

Streaming lets the server **send the page in chunks**. Everything that's ready goes out immediately, with **fallbacks** in place of slow parts, and each slow part is streamed in and swapped into place as soon as its data resolves. Users see and use the page sooner instead of waiting for the slowest query.

Two ways to create boundaries:

- **`loading.tsx`** wraps the whole **page** segment in `<Suspense>`. It's easy, gives instant feedback on navigation, and its fallback can be prefetched.
- **`<Suspense fallback={...}>`** around specific async Server Components is **granular**: the header, filters and fast data render at once, and only the slow widget shows a skeleton.

```tsx
export default function Dashboard() {
  return (
    <>
      <Header />
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart /> {/* async component with a slow query */}
      </Suspense>
    </>
  )
}
```

Pitfalls:

- `loading.tsx` doesn't cover **the layout of its own segment**, so slow data in that layout still blocks.
- Awaiting everything at the top of the page defeats streaming. Push each `await` **down** into the component that needs the data.
- Content inside boundaries is still indexed. Googlebot runs JavaScript and receives the stream; only bots with limited HTML support (the `htmlLimitedBots` list, e.g. Twitterbot) get a blocking, fully rendered response.
