---
title: What is BEM and what problem does it solve?
category: html-css
level: junior
tags: [styling]
sources: []
---

BEM (**Block, Element, Modifier**) is a **class naming convention** that keeps CSS predictable in a global stylesheet. Every class says which component it belongs to, so styles don't leak between components.

- **Block** — a standalone component: `card`
- **Element** — a part of the block, joined with `__`: `card__title`
- **Modifier** — a variant or state, joined with `--`: `card--featured`, `card__button--disabled`

```html
<article class="card card--featured">
  <h2 class="card__title">Title</h2>
  <button class="card__button card__button--disabled">Buy</button>
</article>
```

The problems it solves:

- **Name collisions** — `.title` in two components would clash; `.card__title` won't.
- **Specificity** — everything is a **single class**, so you never need nested selectors like `.card .header h2` and overrides stay simple.
- **Readability** — the HTML shows the structure and its variants.

Downsides: long class names, and it's only a convention that nothing enforces. **CSS Modules** scope class names automatically, so BEM is less common in React projects, but flat single-class selectors are still a good habit.
