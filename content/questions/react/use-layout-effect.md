---
title: What is the difference between useLayoutEffect and useEffect?
category: react
level: mid
tags: [hooks, side-effects, dom]
sources:
  - title: useLayoutEffect – React docs
    url: https://react.dev/reference/react/useLayoutEffect
---

Both run after React updates the DOM, but **`useLayoutEffect` runs synchronously before the browser paints**, while **`useEffect` usually runs after the paint**. Use `useLayoutEffect` only when you need to **measure layout and adjust before the user sees anything**.

Classic example: positioning a tooltip. You must know its height to decide whether it fits above the button.

```tsx
const ref = useRef<HTMLDivElement>(null)
const [height, setHeight] = useState(0)

useLayoutEffect(() => {
  setHeight(ref.current!.getBoundingClientRect().height)
}, [])
```

With `useEffect`, the tooltip would first paint in the wrong place and then jump: a visible **flicker**. With `useLayoutEffect`, React re-renders with the measured height before the first paint.

Trade-offs:

- It **blocks painting**, so slow code inside it makes the app feel sluggish.
- It does not run during server rendering, so the server HTML can't use the measured value.
- Default to `useEffect`; switch only to fix a visible flicker caused by layout reads.
