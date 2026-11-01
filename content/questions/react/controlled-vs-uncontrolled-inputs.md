---
title: What is the difference between controlled and uncontrolled inputs?
category: react
level: junior
tags: [forms, state]
sources:
  - title: input – React docs
    url: https://react.dev/reference/react-dom/components/input
---

A **controlled** input gets its value from React state (`value` + `onChange`), so state is the single source of truth. An **uncontrolled** input keeps its own value in the DOM; you set an initial `defaultValue` and read it when needed.

```tsx
// controlled
const [email, setEmail] = useState('')
<input value={email} onChange={e => setEmail(e.target.value)} />

// uncontrolled
<input name="email" defaultValue="" />
```

When to use which:

- **Controlled**: live validation, formatting as you type, enabling buttons based on input, syncing with other UI.
- **Uncontrolled**: simple forms where you only need values on submit, for example reading `FormData` in a submit handler or form action.

Pitfalls:

- `value` without `onChange` makes the field **read-only** (React warns).
- Switching from `undefined` to a string turns an uncontrolled input into a controlled one, which triggers a warning. Initialise with `''`.
