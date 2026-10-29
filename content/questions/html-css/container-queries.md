---
title: What are container queries and when are they better than media queries?
category: html-css
level: mid
tags: [css-layout, component-patterns]
sources:
  - title: CSS container queries – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
---

Container queries apply styles based on the **size of a parent container** instead of the size of the viewport. That makes a component responsive to **where it's placed**, not to the screen.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}
```

When they're better:

- **Reusable components** — the same card can sit in a narrow sidebar and a wide main column. A media query only knows the viewport width, so it would choose the wrong layout in the sidebar.
- **Design systems** — components carry their own responsive rules and don't depend on the page layout.

Key details:

- You must mark the parent with **`container-type`** (usually `inline-size`). An element **can't query itself**, only an ancestor container.
- `inline-size` containment means the container's width **can't depend on its children**, so it needs a width from its context.
- **Container query units** like `cqi` and `cqw` size things relative to the container, e.g. fluid font sizes.

Media queries are still the right tool for **page-level layout** and user preferences like `prefers-color-scheme`. Tailwind supports container queries with `@container` and variants like `@md:`.
