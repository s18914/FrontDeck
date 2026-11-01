---
title: How do CSS custom properties differ from Sass variables?
category: html-css
level: mid
tags: [styling]
sources:
  - title: Using CSS custom properties (variables) – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties
---

Sass variables are replaced with fixed values **at build time** and disappear from the output. CSS custom properties live **in the browser at runtime**: they follow the **cascade and inheritance**, and you can change them with media queries, classes or JavaScript.

```css
:root {
  --color-bg: white;
  --space: 1rem;
}

[data-theme='dark'] {
  --color-bg: #111; /* everything using it updates */
}

.card {
  background: var(--color-bg);
  padding: var(--space, 16px); /* fallback */
}
```

What custom properties make possible:

- **Theming** — switch dark mode by changing variables on one ancestor.
- **Scoped values** — override `--space` inside one component only.
- **JS integration** — `el.style.setProperty('--progress', '40%')` without rewriting styles.
- **Responsive tokens** — redefine values inside media or container queries.

Limitations:

- They **can't be used in media query conditions** (`@media (min-width: var(--bp))` doesn't work).
- They're untyped by default, so they can't be animated smoothly unless registered with **`@property`**.
- An invalid value only fails when used, and the property falls back to its inherited or initial value.

Today they cover most of what preprocessor variables were used for. Sass is still useful for **mixins, loops and functions**, but many projects don't need it.
