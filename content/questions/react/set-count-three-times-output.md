---
title: After one click, what is logged and what does the button show?
category: react
level: mid
tags: [state, output-prediction]
sources: []
---

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    console.log(count)
  }

  return <button onClick={handleClick}>{count}</button>
}
```

<!-- answer -->

The console logs **`0`** and the button shows **`1`**, not `3`.

Why:

- In this render `count` is a **snapshot** equal to `0`. Each line is really `setCount(0 + 1)`, so React queues "replace with 1" three times.
- The setters do not change `count` in the running handler, so `console.log` prints `0`.
- The updates are **batched** into one re-render, in which `count` is `1`.

To increment three times, use the **updater function**, which receives the latest queued value:

```tsx
setCount(c => c + 1)
setCount(c => c + 1)
setCount(c => c + 1) // button shows 3, log still prints 0
```

React processes the queue in order, so mixing both forms also works predictably: `setCount(count + 5)` then `setCount(c => c + 1)` gives `6`.
