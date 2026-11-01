---
title: What do e.target and e.currentTarget log when the icon inside the button is clicked?
category: browser
level: junior
tags: [events, output-prediction]
sources: []
---

```html
<button id="save">
  <svg id="icon"><!-- ... --></svg>
  Save
</button>
```

```ts
const button = document.querySelector('#save')!

button.addEventListener('click', (e) => {
  console.log((e.target as Element).id)
  console.log((e.currentTarget as Element).id)
})
```

<!-- answer -->

```ts
icon
save
```

- **`e.target`** is the element where the event **started** — the deepest element that was clicked, here the `<svg>`.
- **`e.currentTarget`** is the element whose **listener is running right now** — the button the listener was attached to.

They are equal only when you click directly on the element that has the listener (for example, the text area of the button).

This difference is the reason for a common bug: code like `e.target.dataset.id` sometimes returns `undefined` because the user clicked a child element. Use **`e.currentTarget`** when you need the element with the listener, or **`e.target.closest(...)`** in event delegation.

Also note that `currentTarget` is only set **while the handler runs**; after an `await` or in a later callback it is `null`.
