---
title: What is the difference between display none, visibility hidden and opacity 0?
category: html-css
level: mid
tags: [styling, rendering]
sources: []
---

All three make an element invisible, but they differ in whether it **takes up space**, whether it's **interactive**, and whether **screen readers** can see it.

- **`display: none`** — removed from the **render tree**: takes **no space**, not clickable, not focusable, hidden from screen readers. Changing it triggers **layout**.
- **`visibility: hidden`** — **keeps its space** in the layout, but isn't painted, clickable or focusable, and is hidden from screen readers. Children can override it with `visibility: visible`.
- **`opacity: 0`** — fully transparent but **still there**: takes space, **receives clicks and focus**, and is read by screen readers. It's cheap to animate (compositor-only).

Practical consequences:

- To **fade out** an element, animate `opacity` and then hide it with `visibility` or `display` when the animation ends; otherwise invisible elements block clicks.
- `display` can't be transitioned in the classic way, though modern CSS adds `transition-behavior: allow-discrete` and `@starting-style` for enter/exit effects.
- For text that should be **visible only to screen readers**, use a "visually hidden" utility (`sr-only` in Tailwind) instead of any of these.
- The HTML `hidden` attribute works like `display: none`.
