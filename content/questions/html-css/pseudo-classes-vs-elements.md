---
title: What is the difference between a pseudo-class and a pseudo-element?
category: html-css
level: junior
tags: [styling]
sources: []
---

A **pseudo-class** (single colon) selects an existing element **in a certain state or position**. A **pseudo-element** (double colon) styles a **part of an element**, or a virtual element that isn't in the HTML.

Pseudo-classes:

- State — `:hover`, `:focus-visible`, `:checked`, `:disabled`, `:invalid`
- Position — `:first-child`, `:nth-child(2n)`, `:last-of-type`
- Logic — `:not()`, `:is()`, `:has()`

Pseudo-elements:

- `::before` and `::after` — insert generated content (they need a `content` property)
- `::placeholder`, `::selection`, `::marker`, `::first-line`

```css
.btn:hover { background: navy; }

.required::after {
  content: ' *';
  color: red;
}
```

Details worth knowing:

- Pseudo-classes add to the **class column** of specificity; pseudo-elements count like **element types**.
- `::before` and `::after` don't work on **replaced elements** like `<img>` or `<input>`, because those have no content box to insert into.
- Old single-colon forms like `:before` still work for backwards compatibility, but use `::` for pseudo-elements.
- Generated content isn't reliably read by screen readers or selectable, so keep real content in the HTML.
