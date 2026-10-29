---
title: What is the difference between ARIA roles, states and properties?
category: accessibility
level: mid
tags: [aria]
sources: []
---

All three describe an element in the **accessibility tree**. A **role** says *what the element is*, a **property** describes a *fairly stable characteristic or relationship*, and a **state** describes a *current condition that changes with interaction*.

- **Roles** — `role="tablist"`, `role="dialog"`, `role="alert"`, landmarks like `navigation`. Native elements have implicit roles (`<nav>` is navigation, `<button>` is button), so you rarely set them yourself.
- **Properties** — `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-haspopup`, `aria-required`.
- **States** — `aria-expanded`, `aria-checked`, `aria-selected`, `aria-pressed`, `aria-disabled`, `aria-invalid`.

The practical difference: **states must stay in sync with the UI**, so in React you derive them from state.

```tsx
const menuId = useId()

<button aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}>
  Options
</button>
<ul id={menuId} hidden={!open}>…</ul>
```

Pitfalls:

- A role is a **promise** of behavior — `role="tab"` means users expect arrow keys to work.
- Attributes that are not supported by the element's role are ignored.
- `aria-hidden="true"` hides an element and its children from screen readers, but not from the mouse or keyboard.
- In JSX, `aria-*` attributes stay kebab-case, unlike most other props.
