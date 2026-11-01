---
title: When would you use useImperativeHandle, and why should imperative component APIs be the exception?
category: react
level: senior
tags: [hooks, dom]
sources:
  - title: useImperativeHandle – React docs
    url: https://react.dev/reference/react/useImperativeHandle
---

`useImperativeHandle(ref, createHandle, deps)` lets a component **decide what a parent receives through its ref**. Instead of the raw DOM node, you expose a small, deliberate API like `{ focus, scrollToBottom }`. In React 19 `ref` is a regular prop, so `forwardRef` is no longer needed.

```tsx
type SearchHandle = { focus: () => void; clear: () => void }

function SearchInput({ ref }: { ref?: Ref<SearchHandle> }) {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = ''
    },
  }), [])
  return <input ref={inputRef} />
}
```

When it is justified, for things that cannot be expressed as props:

- **Focus, selection and scrolling**, such as focusing the first invalid field or scrolling a chat to the bottom.
- **Media and animation control**: play, pause, restart.
- **Hiding internals**: the parent cannot change styles or DOM structure directly, so you can refactor the markup without breaking consumers.

Why it should be the exception:

- Refs **bypass React's data flow**. If something can be a prop, make it a prop. `modal.open()` is a smell, while `<Modal open={isOpen}>` works with state, is visible in DevTools and is easy to test.
- Imperative calls create **hidden coupling**: the parent must know when the child is mounted and what its methods do.
- The handle exists only **after commit**. It is `null` during the first render, so never call it during render. Call it from event handlers or effects.

Rule of thumb: describe **what** the UI should look like with props and state, and use an imperative handle only for **actions in time** that have no natural state representation.
