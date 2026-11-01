---
title: What is event delegation and why would you use it?
category: browser
level: junior
tags: [events, dom]
sources: []
---

Event delegation means attaching **one listener to a common parent** instead of one per child, and using `event.target` to find out which child was clicked. It works because most events **bubble** up to the parent.

```ts
list.addEventListener('click', (e) => {
  const item = (e.target as HTMLElement).closest('li')
  if (!item || !list.contains(item)) return
  console.log('Clicked', item.dataset.id)
})
```

Why use it:

- **Fewer listeners** — one instead of hundreds for a long list or table.
- **Works for elements added later** — new children are handled automatically, with no need to attach listeners again.

Pitfalls:

- `e.target` may be a **nested element** (an icon inside the `<li>`), so use `closest()` to get the element you care about.
- Events that **don't bubble** (`focus`, `blur`, `mouseenter`) need their bubbling versions (`focusin`, `mouseover`).

React uses this idea internally: it attaches listeners at the **root container**, not on every element.
