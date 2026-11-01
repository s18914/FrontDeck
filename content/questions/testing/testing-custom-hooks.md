---
title: How do you test a custom React hook with renderHook?
category: testing
level: mid
tags: [hooks]
sources:
  - title: API – React Testing Library
    url: https://testing-library.com/docs/react-testing-library/api/
---

Hooks can only run inside a component, so **`renderHook`** from `@testing-library/react` renders a tiny test component that calls your hook. It returns **`result.current`** with the latest return value, plus `rerender` and `unmount`.

```tsx
test('increments the counter', () => {
  const { result } = renderHook(() => useCounter(5))
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
})
```

Key points:

- Wrap calls that **update state** in **`act`**, and always read **`result.current` again** afterwards — don't destructure it once at the top, or you'll keep a stale value.
- Use **`initialProps`** and **`rerender(newProps)`** to test how the hook reacts to changing arguments.
- Use the **`wrapper`** option to provide context (a theme, a `QueryClientProvider`).
- For async hooks, wait with `waitFor(() => expect(result.current.data).toBeDefined())`.

When to use it: for **reusable hooks** with real logic (shared across components or published). If a hook is used by one component only, testing it **through that component** is usually simpler and closer to real behavior.
