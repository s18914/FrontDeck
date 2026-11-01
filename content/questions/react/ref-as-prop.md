---
title: How do you pass a ref to your own function component in React 19?
category: react
level: mid
tags: [dom, hooks]
sources:
  - title: React v19 – React blog
    url: https://react.dev/blog/2024/12/05/react-19
  - title: forwardRef – React docs
    url: https://react.dev/reference/react/forwardRef
---

In React 19, **`ref` is a regular prop** for function components. You destructure it and attach it to the element you want to expose; **`forwardRef` is no longer needed**.

```tsx
type InputProps = { label: string; ref?: React.Ref<HTMLInputElement> }

function TextInput({ label, ref }: InputProps) {
  return (
    <label>
      {label}
      <input ref={ref} />
    </label>
  )
}

const inputRef = useRef<HTMLInputElement>(null)
<TextInput label="Email" ref={inputRef} />
```

How it was before: `ref` was stripped from props, so components had to be wrapped in `forwardRef((props, ref) => …)`. That still works, but React plans to **deprecate `forwardRef`**, so new code should use the prop. Codebases on React 18 and many older libraries still use it, which is why it comes up in interviews.

Related React 19 change: a **ref callback can return a cleanup function**, which runs when the element is removed, similar to an effect cleanup.

Expose only what parents need. If they should call a few methods rather than touch the DOM node, `useImperativeHandle` can limit the exposed API.
