---
title: What is a custom hook and what exactly does it share between components?
category: react
level: mid
tags: [hooks]
sources:
  - title: Reusing Logic with Custom Hooks – React docs
    url: https://react.dev/learn/reusing-logic-with-custom-hooks
---

A custom hook is a **function whose name starts with `use` and which calls other hooks**. It shares **stateful logic, not state**: every component that calls it gets its own, independent state.

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])
  return isOnline
}
```

If `StatusBar` and `SaveButton` both call `useOnlineStatus()`, each has its own `isOnline` state and its own listeners. To share the **same** value, lift state up or use context.

Key points:

- The `use` prefix tells React and the linter that the **Rules of Hooks** apply inside.
- Custom hooks re-run on every render of the calling component and receive the latest props.
- Name them after **what they do** (`useDebouncedValue`, `useMediaQuery`), not after lifecycle (`useMount`).
- A function that calls no hooks should be a regular function, without the `use` prefix.
