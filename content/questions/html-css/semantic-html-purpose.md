---
title: What is semantic HTML and why does it matter?
category: html-css
level: junior
tags: [semantic-html]
sources:
  - title: Semantics – MDN
    url: https://developer.mozilla.org/en-US/docs/Glossary/Semantics
---

Semantic HTML means choosing elements by **what the content is**, not how it should look: `<nav>`, `<main>`, `<article>`, `<button>`, `<h1>`–`<h6>` instead of generic `<div>`s and `<span>`s.

```html
<header>…</header>
<nav>…</nav>
<main>
  <article>
    <h1>Post title</h1>
    <p>…</p>
  </article>
</main>
<footer>…</footer>
```

Why it matters:

- **Accessibility** — screen readers use landmarks and headings to navigate, and native elements like `<button>` come with keyboard support and focus for free.
- **SEO** — search engines understand the structure and the main content better.
- **Built-in behaviour** — `<button>` submits forms, `<a href>` can be opened in a new tab, `<details>` toggles without JavaScript.
- **Maintainability** — the markup is easier to read than a wall of `div`s.

A classic red flag in interviews: `<div onClick>` used as a button. It needs a role, tabindex and key handlers to match what `<button>` already does.
