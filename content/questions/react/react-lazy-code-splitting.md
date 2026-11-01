---
title: How do you code-split a component with React.lazy, and what are the common mistakes?
category: react
level: mid
tags: [bundling, suspense]
sources:
  - title: lazy – React docs
    url: https://react.dev/reference/react/lazy
---

`lazy(() => import('./Chart'))` creates a component whose code is loaded **the first time it renders**. The bundler puts the dynamic import into a separate chunk, and a parent `<Suspense>` boundary shows its fallback while the chunk downloads.

```tsx
import { lazy, Suspense } from 'react'

const Chart = lazy(() => import('./Chart')) // module scope

function Report({ showChart }: { showChart: boolean }) {
  if (!showChart) return null
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <Chart />
    </Suspense>
  )
}
```

Rules and pitfalls:

- The loader must resolve to a module with a **default export**. For a named export, map it: `import('./Chart').then(m => ({ default: m.Chart }))`.
- Declare lazy components at **module top level**. Calling `lazy` inside a component creates a new component type on every render, which resets its state.
- Split things that are **not needed for the first paint**: routes, modals, heavy widgets like editors or charts. Splitting tiny components only adds requests.
- A failed chunk download **rejects**, so the error goes to the nearest error boundary. Plan a retry UI.
- You can **preload** by calling the same `import()` early, for example on hover, so the chunk is cached when the component renders.

In Next.js, `next/dynamic` builds on the same idea and adds options such as disabling SSR for a component.
