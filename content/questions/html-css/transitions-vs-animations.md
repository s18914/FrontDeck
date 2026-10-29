---
title: When would you use a CSS transition and when a CSS animation, and which properties should you animate?
category: html-css
level: mid
tags: [styling, rendering]
sources:
  - title: How to create high-performance CSS animations – web.dev
    url: https://web.dev/articles/animations-guide
---

Use a **transition** to animate between **two states** when a property changes, e.g. on `:hover` or when a class is toggled. Use an **animation** (`@keyframes`) for **multi-step**, looping or automatically starting motion that doesn't need a state change.

```css
.btn {
  transition: transform 150ms ease-out;
}
.btn:hover { transform: scale(1.05); }

@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner { animation: spin 1s linear infinite; }
```

For smooth 60 fps motion, animate **`transform` and `opacity`**:

- They can be handled by the **compositor** (often on the GPU) without recalculating layout or repainting.
- Animating `width`, `height`, `top`, `left` or `margin` triggers **layout on every frame**, and `background-color` or `box-shadow` trigger **paint**, which causes jank on slower devices.
- So use `transform: translateX()` instead of `left`, and `scale()` instead of `width`.

Other good practices:

- Respect **`prefers-reduced-motion`** and tone down or disable motion for users who ask for it.
- Don't use `transition: all`; list the properties so unexpected changes don't animate.
- `will-change: transform` can promote an element to its own layer ahead of time, but use it sparingly because each layer costs memory.
