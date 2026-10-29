---
title: What is tearing, and how does useSyncExternalStore prevent it?
category: react
level: senior
tags: [concurrency, state, hooks]
sources:
  - title: useSyncExternalStore – React docs
    url: https://react.dev/reference/react/useSyncExternalStore
---

**Tearing** is when different parts of the UI show **different versions of the same data** in one commit. It can happen with concurrent rendering: React yields in the middle of rendering a tree, an **external mutable store** changes during the pause, and components rendered before the change see the old value while those after see the new one.

`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` gives React a safe way to read such a store:

- `subscribe(callback)` subscribes to changes and returns an unsubscribe function.
- `getSnapshot()` returns the current value and must return the **same value (by `Object.is`) when nothing changed**. Returning a new object every call causes an infinite loop.
- React checks the snapshot again before committing. If it changed, React re-renders **synchronously**, so every component sees the same value.

```tsx
function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function useIsOnline() {
  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true)
}
```

Practical notes:

- Use it for **stores that live outside React**: state libraries (Redux and Zustand use it internally) and browser APIs like `matchMedia` or `navigator.onLine`.
- Define `subscribe` **outside the component**, or React resubscribes on every render.
- Provide `getServerSnapshot` for server rendering and hydration.
- Store updates are **always blocking**. If a store changes during a transition, React falls back to a blocking render. For non-blocking updates, keep the state in React.
- The older `useEffect` + `useState` subscription pattern is prone to tearing and an extra render.
