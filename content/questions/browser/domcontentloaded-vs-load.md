---
title: What is the difference between the DOMContentLoaded and load events?
category: browser
level: junior
tags: [events, rendering]
sources: []
---

**`DOMContentLoaded`** fires on `document` when the **HTML is fully parsed** and deferred scripts have run. **`load`** fires on `window` later, when **everything** has finished loading, including images, stylesheets, iframes and fonts.

```ts
document.addEventListener('DOMContentLoaded', () => {
  // DOM is ready, images may still be loading
})

window.addEventListener('load', () => {
  // all resources are loaded
})
```

Key points:

- Use `DOMContentLoaded` when you only need the **DOM tree**, for example to attach listeners. It fires much earlier on image-heavy pages.
- Use `load` when you need **final sizes of images** or other resources.
- `DOMContentLoaded` does **not wait for images or async scripts**, but it does wait for `defer` and module scripts.
- If your script is already `defer` or a module, the DOM is ready when it runs, so you usually don't need the listener at all.
