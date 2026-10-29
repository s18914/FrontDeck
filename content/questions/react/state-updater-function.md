---
title: When should you pass an updater function to a state setter instead of a value?
category: react
level: mid
tags: [state, hooks]
sources:
  - title: useState – React docs
    url: https://react.dev/reference/react/useState
---

Use the updater form `setX(prev => next)` when the **new state is calculated from the previous state**. React passes the **latest queued value**, not the possibly stale value captured by your closure.

```tsx
setCount(count + 1)        // uses the snapshot from this render
setCount(c => c + 1)       // uses the latest pending state
```

Where it really matters:

- **Several updates in one event**: three `setCount(c => c + 1)` calls give `+3`; three `setCount(count + 1)` give `+1`.
- **Closures that outlive a render**: `setInterval`, timeouts, async callbacks and effects with `[]` deps would otherwise read a stale value.
- **Toggles and counters**: `setOpen(o => !o)` is always correct.
- It lets you drop the state variable from an effect's dependency array.

Rules:

- The updater must be **pure**: no side effects, no mutation. In StrictMode React calls it twice to check that.
- Updaters are queued and run in order during the next render.
- If the new value does not depend on the old one (`setName(e.target.value)`), a plain value is fine.
