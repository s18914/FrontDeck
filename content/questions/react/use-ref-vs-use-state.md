---
title: What is the difference between useRef and useState?
category: react
level: mid
tags: [hooks, state]
sources:
  - title: Referencing Values with Refs – React docs
    url: https://react.dev/learn/referencing-values-with-refs
---

Both keep a value **between renders**. Changing **state triggers a re-render**; changing a **ref does not**. A ref is a plain mutable object `{ current }` that React leaves alone.

```tsx
function Stopwatch() {
  const [startedAt, setStartedAt] = useState<number | null>(null)  // shown in UI
  const intervalRef = useRef<number | null>(null)                   // not shown

  function start() {
    setStartedAt(Date.now())
    intervalRef.current = window.setInterval(tick, 10)
  }
  function stop() {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
}
```

Choose by asking **"does the UI need to show this?"**:

- Yes: **state**.
- No, it is bookkeeping: **ref**. Examples: timer IDs, a DOM node, the previous value, an `AbortController`, a flag like "already logged".

Pitfalls:

- Don't **read or write `ref.current` during render** (apart from lazy initialisation). The result is unpredictable because React won't re-render when it changes.
- Mutating a ref is **synchronous**, unlike a state update, which only appears in the next render.
- Putting UI data in a ref leads to a screen that does not update.
