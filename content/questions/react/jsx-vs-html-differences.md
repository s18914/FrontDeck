---
title: How does JSX differ from HTML?
category: react
level: junior
tags: [rendering, styling]
sources: []
---

JSX looks like HTML but is **JavaScript**, so attribute names follow DOM properties and JavaScript rules.

The differences you hit most often:

- **`className`** instead of `class`, and **`htmlFor`** instead of `for` (both are reserved words in JS).
- Attributes are **camelCase**: `onClick`, `tabIndex`, `maxLength`. The exceptions are `aria-*` and `data-*`, which keep dashes.
- **`style` takes an object** with camelCase properties, not a string.
- Every tag must be **closed**, including void ones: `<img />`, `<br />`.
- A component returns **one root element** (use a Fragment for several).
- `{}` embeds JavaScript expressions; comments are written as `{/* … */}`.

```tsx
<label htmlFor="email" className="label" style={{ fontSize: 14, marginTop: '1rem' }}>
  Email
</label>
```

Numeric values in `style` get `px` added automatically for most properties.
