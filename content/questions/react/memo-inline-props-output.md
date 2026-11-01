---
title: How many times does a memoized child log when its parent passes an inline object and an inline function?
category: react
level: mid
tags: [memoization, rendering, output-prediction]
sources: []
---

No React Compiler, no StrictMode. The user clicks **+** three times.

```tsx
const Child = memo(function Child({ style, onClick }: ChildProps) {
  console.log('Child render')
  return <button style={style} onClick={onClick}>Hi</button>
})

function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+ {count}</button>
      <Child style={{ color: 'red' }} onClick={() => {}} />
    </>
  )
}
```

<!-- answer -->

`Child render` is logged **4 times**: once on mount and once for each click. `memo` compares props with `Object.is`, and both `style={{ color: 'red' }}` and `onClick={() => {}}` are **new references on every render** of `Parent`. The contents look identical, but the references differ, so memo never skips.

Ways to make it log only once:

- **Hoist constants** out of the component: `const redStyle = { color: 'red' }` at module scope.
- **Stabilize per-render values** with `useMemo` for objects and `useCallback` for functions.
- Enable the **React Compiler**, which memoizes the inline object and function for you.
- **Move the state down**: put `count` and its button in a separate component, so `Parent` does not re-render at all.

The takeaway: memo is only as good as the **stability of every prop**. One unstable prop, including JSX passed as `children`, is enough to disable it.
