---
title: Why do list items need a key, and why is the array index a bad key?
category: react
level: junior
tags: [rendering]
sources:
  - title: Rendering Lists – React docs
    url: https://react.dev/learn/rendering-lists
---

A `key` tells React **which item is which between renders**, so it can match old and new elements and keep the right state and DOM node with the right item.

```tsx
<ul>
  {todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} />
  ))}
</ul>
```

Why not the index:

- The index describes **position, not identity**. If you insert, delete or sort items, the same index now points to a different item.
- React then **reuses the wrong component**: an input keeps text typed for another row, a checkbox stays checked on the wrong item.

Rules for good keys:

- **Stable and unique among siblings**, usually an ID from the data.
- Never generate them during render (`Math.random()`, `crypto.randomUUID()`), or every item remounts on each render.
- The index is acceptable only for **static lists** that never reorder or change.
