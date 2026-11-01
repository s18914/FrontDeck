---
title: Why does logging state right after calling its setter show the old value?
category: react
level: mid
tags: [state]
sources:
  - title: State as a Snapshot – React docs
    url: https://react.dev/learn/state-as-a-snapshot
---

Because state in a given render is a **fixed snapshot**. Calling the setter does not change the variable; it **schedules a new render**, and only that next render receives the new value.

```tsx
function handleClick() {
  setCount(count + 1)
  console.log(count)                       // still the old value
  setTimeout(() => alert(count), 3000)     // also the old value
}
```

How to think about it:

- Each render is a function call with its own `count` constant. Event handlers and timeouts created in that render **close over that render's values**.
- Even after the component has re-rendered, the `alert` above shows the value from the moment of the click.
- It is not "async" in the promise sense; you cannot `await` a setter.

What to do instead:

- If you need the new value right away, **compute it into a local variable** and use it for both the setter and the follow-up logic.
- If the next state depends on the previous one, use the **updater function** `setCount(c => c + 1)`.
- To react to a committed change, render from it or, if it touches an external system, use an effect.
