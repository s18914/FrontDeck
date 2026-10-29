---
title: In which situations should you avoid using useEffect?
category: react
level: mid
tags: [hooks, side-effects]
sources:
  - title: You Might Not Need an Effect – React docs
    url: https://react.dev/learn/you-might-not-need-an-effect
---

Effects are for **synchronizing with external systems**. If no external system is involved, you usually don't need one, and using it adds an extra render and opportunities for bugs.

Common cases where an effect is the wrong tool:

- **Transforming data for rendering**: compute it during render (`const visible = todos.filter(...)`) instead of an effect that sets state.
- **Responding to a user action**: sending a POST on submit or showing a toast after "Buy" belongs in the **event handler**, because you know exactly what happened there.
- **Resetting state when a prop changes**: give the component a **`key`** instead of an effect that clears state.
- **Notifying the parent** about a change: call the `onChange` callback in the same handler that updates state.
- **Chains of effects** that set state which triggers another effect: compute the next state in one handler.

```tsx
// avoid
const [fullName, setFullName] = useState('')
useEffect(() => setFullName(`${first} ${last}`), [first, last])

// prefer
const fullName = `${first} ${last}`
```

A useful test: **"Why does this code run?"** If the answer is "because the user did X", it belongs in a handler. If it is "because the component is on screen", it is an effect.
