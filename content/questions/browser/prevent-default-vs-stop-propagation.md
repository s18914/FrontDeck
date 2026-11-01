---
title: What is the difference between preventDefault and stopPropagation?
category: browser
level: junior
tags: [events]
sources: []
---

`preventDefault()` cancels the **browser's default action** for the event, such as following a link or submitting a form. `stopPropagation()` stops the event from **travelling further** to other elements, but the default action still happens.

```ts
form.addEventListener('submit', (e) => {
  e.preventDefault() // no page reload, handle it with fetch instead
})

menu.addEventListener('click', (e) => {
  e.stopPropagation() // the document's "close menu" listener won't see it
})
```

Key points:

- They are **independent**: one doesn't imply the other.
- `stopImmediatePropagation()` also skips the **remaining listeners on the same element**.
- `preventDefault()` does nothing if the event is not **cancelable**, and inside a **passive** listener it is ignored.
- Overusing `stopPropagation()` breaks code that relies on bubbling, such as analytics or "click outside to close" handlers. Prefer checking `e.target` where you can.
