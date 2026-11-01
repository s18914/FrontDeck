---
title: What does this timer display after five seconds, and why?
category: react
level: mid
tags: [hooks, scope, output-prediction]
sources:
  - title: useEffectEvent – React docs
    url: https://react.dev/reference/react/useEffectEvent
---

```tsx
function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return <p>{count}</p>
}
```

<!-- answer -->

It shows **`1`** and stays there. This is a **stale closure**.

The effect runs once (`[]`), so the interval callback is created in the **first render** and closes over `count = 0` forever. Every second it calls `setCount(0 + 1)`. The first call changes `0` to `1`; later calls set `1` again, so React bails out.

Fixes:

- Best: the **updater function**, which does not read `count` from the closure at all.

```tsx
setCount(c => c + 1)
```

- Add `count` to the dependencies. It works, but the interval is cleared and recreated on every tick.
- If the callback must read other **latest props or state** without restarting the interval, move that logic into an **Effect Event** (`useEffectEvent`, stable since React 19.2). Before that, the workaround was keeping the latest value in a ref.

The `exhaustive-deps` lint rule warns about this exact bug: `count` is used inside the effect but missing from the array.
