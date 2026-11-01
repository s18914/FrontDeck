---
title: Why can a single context cause many unnecessary re-renders, and how do you fix it?
category: react
level: senior
tags: [context, rendering, memoization]
sources:
  - title: useContext – React docs
    url: https://react.dev/reference/react/useContext
---

Every component that reads a context **re-renders whenever the provider's `value` changes** by `Object.is`, no matter which part of the value it uses, and `memo` cannot stop it. A big "app state" context makes every consumer re-render on any change, or even on every provider render if the value object is recreated each time.

Fixes, cheapest first:

1. **Stabilize the value.** Wrap the object in `useMemo` and its functions in `useCallback`, so the value changes only when its contents do. The React Compiler does this automatically.
2. **Split contexts** by concern and update frequency, and separate **state from actions**. The `dispatch` from `useReducer` is stable, so components that only read `dispatch` don't re-render when the state changes. They still re-render with their parent, like any component.
3. **Read the context low in the tree**, in small leaf components, or read it in a thin wrapper and pass only the needed field to a memoized child.
4. **Use an external store with selectors.** Context has no built-in selector. For frequently changing shared state, put a store in context and subscribe to slices with `useSyncExternalStore`. Only components whose slice changed re-render. Zustand and Redux work this way.

```tsx
function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, [])
  return (
    <TodosContext value={todos}>
      <TodosDispatchContext value={dispatch}>{children}</TodosDispatchContext>
    </TodosContext>
  )
}
```

Also avoid putting **rapidly changing values**, such as input text, scroll position or mouse coordinates, into a widely used context. Keep them in local state close to where they are used.
