---
title: Which color does the link text get?
category: html-css
level: mid
tags: [styling, output-prediction]
sources: []
---

```html
<nav id="main-nav" class="nav">
  <a class="link active" href="/">Home</a>
</nav>
```

```css
#main-nav a          { color: red; }
.nav .link.active    { color: green; }
nav a:where(.active) { color: purple; }
a:is(#home, .link)   { color: orange; }
```

<!-- answer -->

The link is **orange**.

Specificity of each rule (IDs – classes – elements):

- `#main-nav a` → **1-0-1**
- `.nav .link.active` → 0-3-0
- `nav a:where(.active)` → 0-0-2, because **`:where()` always adds zero**
- `a:is(#home, .link)` → **1-0-1**, because **`:is()` takes the specificity of its most specific argument** — the `#home` ID — even though that argument doesn't match this element

The ID column is compared first, so both 1-0-1 rules beat green and purple, no matter how many classes those have. Between the two tied rules, the one that **comes later** in the stylesheet wins, so orange.

Common traps here:

- Thinking three classes (`0-3-0`) can beat one ID. They can't — columns don't carry over.
- Assuming `:is()` counts only the part that matched. It always uses the **highest** argument, which is a reason to prefer `:where()` in reusable base styles.
- If any rule had `!important`, it would beat all of these regardless of specificity.
