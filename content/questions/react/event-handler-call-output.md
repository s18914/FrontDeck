---
title: What happens when this component renders?
category: react
level: junior
tags: [events, output-prediction]
sources: []
---

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

<!-- answer -->

It crashes with **"Too many re-renders. React limits the number of renders to prevent an infinite loop."**

`onClick={setCount(count + 1)}` **calls** `setCount` while rendering instead of passing a function. Setting state during render schedules another render, which calls `setCount` again, and so on forever.

The fix is to pass a function that React calls later, on click:

```tsx
<button onClick={() => setCount(count + 1)}>
```

The same mistake with a handler that does not set state (`onClick={handleClick()}`) won't loop, but it is still wrong: the handler runs on **every render** and never on click. TypeScript usually catches this, because the call returns `void`, not a function.
