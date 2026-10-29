---
title: What are the Rules of Hooks and why do they exist?
category: react
level: mid
tags: [hooks]
sources:
  - title: Rules of Hooks – React docs
    url: https://react.dev/reference/rules/rules-of-hooks
---

There are two rules:

1. **Call hooks only at the top level** of a component or custom hook: not inside conditions, loops, nested functions, `try`/`catch`, or after an early `return`.
2. **Call hooks only from React functions**: components and custom hooks, not regular functions or class components.

Why: React does not know hooks by name. It stores each component's hook data in a **list and matches it by call order**. The first `useState` call gets slot 1, the second gets slot 2, and so on. If a hook is skipped on one render, every following hook reads the **wrong slot**, and state gets mixed up.

```tsx
// wrong
if (isLoggedIn) {
  const [name, setName] = useState('')
}

// right: call it always, use it conditionally
const [name, setName] = useState('')
```

The `eslint-plugin-react-hooks` lint rules catch violations automatically and should be enabled in every project. The `use` API is the one documented exception that may be called conditionally.
