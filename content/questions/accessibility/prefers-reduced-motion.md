---
title: What is prefers-reduced-motion and how should you respect it?
category: accessibility
level: junior
tags: [styling]
sources: []
---

`prefers-reduced-motion` is a CSS media feature that tells you the user asked their operating system to **minimize non-essential motion**. Large movements, parallax and zoom effects can cause dizziness or nausea for people with vestibular disorders, so you should tone animations down when it is set.

```css
.card {
  transition: transform 300ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

Key points:

- **Reduce, don't necessarily remove** — replace a slide with a fade or shorten it; subtle feedback can stay.
- In JavaScript, check `matchMedia('(prefers-reduced-motion: reduce)').matches` before smooth scrolling or JS-driven animations. Libraries like Motion expose a hook for it.
- A safe default is to write motion **inside** `@media (prefers-reduced-motion: no-preference)`, so animations are opt-in.
- Auto-playing animation that lasts more than 5 seconds also needs a way to pause it.
