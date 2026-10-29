---
title: In development with StrictMode, what does this component log when it mounts?
category: react
level: mid
tags: [hooks, side-effects, output-prediction]
sources: []
---

```tsx
function Chat() {
  console.log('render')

  useEffect(() => {
    console.log('connect')
    return () => console.log('disconnect')
  }, [])

  return <p>Chat</p>
}

// rendered inside <StrictMode>, development build
```

<!-- answer -->

```ts
render
render
connect
disconnect
connect
```

What happens:

1. StrictMode **calls the component function twice** to check that rendering is pure, so `render` appears twice (the second log is dimmed if React DevTools is installed).
2. React commits and runs the effect: `connect`.
3. StrictMode **simulates an unmount and remount**: it runs the cleanup (`disconnect`) and then the setup again (`connect`).

In a **production build** you would see only `render` and `connect`.

The extra cycle is intentional. If the second `connect` causes a real problem (two open sockets, a duplicated listener), the **cleanup is missing or incomplete**. The fix is to make setup and cleanup symmetrical, not to block the second run with a ref.
