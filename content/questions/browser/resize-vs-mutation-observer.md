---
title: What are ResizeObserver and MutationObserver used for?
category: browser
level: mid
tags: [dom]
sources: []
---

**`ResizeObserver`** notifies you when an **element's size changes**. **`MutationObserver`** notifies you when the **DOM tree changes**: nodes added or removed, attributes or text modified.

`ResizeObserver` is better than the window `resize` event because elements change size for many reasons other than the window: a sidebar collapses, content loads, a flex sibling grows.

```ts
const ro = new ResizeObserver(([entry]) => {
  const { width } = entry.contentRect
  chart.resize(width)
})
ro.observe(container)
```

Typical uses:

- **ResizeObserver** — resizing a canvas or chart to its container, auto-growing textareas, showing "more" buttons when content overflows. For pure styling, **container queries** in CSS are often enough.
- **MutationObserver** — reacting to DOM changes you don't control, such as third-party widgets, browser extensions or CMS content. Options like `childList`, `attributes` and `subtree` choose what to watch.

Both deliver changes **in batches** (MutationObserver as a microtask, ResizeObserver once per frame before paint), which is far cheaper than polling. Always call **`disconnect()`** when done, for example in a React Effect cleanup. In React apps, MutationObserver is rarely needed for your own components, because you already know when your state changes.
