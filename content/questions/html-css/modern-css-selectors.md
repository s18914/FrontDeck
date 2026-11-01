---
title: What do the :has(), :is() and :where() selectors do, and how do they affect specificity?
category: html-css
level: mid
tags: [styling]
sources:
  - title: ':has() – MDN'
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
  - title: ':where() – MDN'
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where
---

**`:has()`** selects an element based on **what it contains** or what follows it — the long-missing "parent selector". **`:is()`** and **`:where()`** group a list of selectors to avoid repetition; they match the same elements but differ in **specificity**.

```css
/* style a card only if it contains an image */
.card:has(img) { padding: 0; }

/* label of an invalid field */
.field:has(input:user-invalid) label { color: crimson; }

/* same as "article h2, section h2, aside h2" */
:is(article, section, aside) h2 { margin-top: 0; }

/* zero specificity – easy to override */
:where(ul, ol)[role='list'] { list-style: none; }
```

Specificity:

- **`:is()`**, **`:has()`** and **`:not()`** take the specificity of their **most specific argument**. `:is(#id, .a)` counts as an ID even when `.a` is what matched.
- **`:where()`** is always **0-0-0**, so it's ideal for **resets and library base styles** that users should be able to override with one class.

Other useful details: `:is()` and `:where()` are **forgiving** — an invalid selector in the list is ignored instead of breaking the whole rule. `:has()` replaces many cases where you'd toggle a class with JavaScript, like styling a form group when its checkbox is checked. It's supported in all modern browsers.
