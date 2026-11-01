---
title: What is a passive event listener and why does it improve scrolling?
category: browser
level: mid
tags: [events, rendering]
sources: []
---

A passive listener promises the browser that it will **never call `preventDefault()`**. Because of that, the browser can **start scrolling immediately** instead of waiting for your JavaScript to finish.

```ts
window.addEventListener('touchmove', onTouchMove, { passive: true })
```

Why it matters:

- For `touchstart`, `touchmove` and `wheel`, a listener **could** cancel the scroll. Without a guarantee, the browser has to **wait for the handler** before scrolling, and a slow handler makes scrolling feel laggy.
- With `passive: true`, scrolling runs on the **compositor thread** while your handler runs in parallel.
- If you call `preventDefault()` in a passive listener, it is **ignored** and the console shows a warning.

Browsers already treat `touchstart`, `touchmove` and `wheel` listeners on **`window`, `document` and `body`** as passive by default. If you really need to block scrolling (a custom drag gesture or a map), register with **`{ passive: false }`** explicitly, or use CSS like `touch-action: none` or `overscroll-behavior`, which is often the cleaner option.

Note that `scroll` itself can't be cancelled at all, so `passive` makes no difference for it.
