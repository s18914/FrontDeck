---
title: In what order are these render and effect logs printed on the first mount?
category: react
level: mid
tags: [hooks, rendering, output-prediction]
sources: []
---

```tsx
function Child() {
  console.log('Child render')
  useEffect(() => console.log('Child effect'), [])
  return null
}

function Parent() {
  console.log('Parent render')
  useEffect(() => console.log('Parent effect'), [])
  return <Child />
}

// production build, no StrictMode
```

<!-- answer -->

```ts
Parent render
Child render
Child effect
Parent effect
```

Why:

- **Rendering goes top-down.** React calls `Parent`, which returns `<Child />`, so `Child` renders next. No effect runs during rendering.
- After the whole tree is rendered, React **commits it to the DOM** and only then runs effects, usually after the browser has painted.
- **Effects run bottom-up**: children before parents. When the parent's effect runs, it can rely on its children's effects having run and their DOM being ready.

`useLayoutEffect` setups follow the same child-first order. **Unmounting is the opposite**: when the tree is removed, cleanups run **parent first**, then child. In development with StrictMode each render log would appear twice and each effect would run setup, cleanup, setup.
