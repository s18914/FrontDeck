---
title: What does mobile-first responsive design mean in terms of media queries?
category: html-css
level: junior
tags: [css-layout, styling]
sources:
  - title: Using media queries – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using
---

Mobile-first means writing the **base styles for small screens** first, then adding **`min-width` media queries** that enhance the layout as the screen gets wider.

```css
.grid {
  display: grid;
  gap: 16px; /* one column on phones */
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1200px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
```

Why mobile-first:

- Small-screen styles are usually **simpler**, so you add complexity instead of undoing it with `max-width` overrides.
- It forces you to prioritise **content** for the most constrained case.

Useful details:

- Media queries can test more than width: `prefers-color-scheme`, `prefers-reduced-motion`, `hover`, `orientation`.
- Modern **range syntax** reads naturally: `@media (width >= 768px)`.
- Choose breakpoints where **your content breaks**, not by device names.
- Tailwind works the same way: `md:grid-cols-2` means "from `md` and up".

Without the **viewport meta tag**, mobile browsers render at a fake desktop width and your queries won't match as expected.
