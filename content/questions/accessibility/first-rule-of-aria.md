---
title: When should you use ARIA instead of semantic HTML, and what is the first rule of ARIA?
category: accessibility
level: mid
tags: [aria, semantic-html]
sources:
  - title: Using ARIA – W3C
    url: https://www.w3.org/TR/using-aria/
---

The first rule of ARIA: **if a native HTML element or attribute already gives you the semantics and behavior you need, use it instead of ARIA**. ARIA only changes what assistive technology is *told*. It adds **no behavior** — no focus, no keyboard handling, no styling.

Why native wins:

- `<button>`, `<a href>`, `<input type="checkbox">`, `<dialog>` and `<details>` come with focus, keyboard support and states that are tested across browsers and screen readers.
- `role="button"` on a `div` only makes it *announced* as a button. You still have to add `tabIndex`, Enter and Space handling, and disabled logic yourself.
- **Wrong ARIA is worse than none** — it actively misinforms screen reader users. A `role="menu"` promises arrow-key navigation; if it's missing, users get stuck.

Other rules from the same guidance:

- Don't override native semantics without a reason (`<h2 role="tab">` breaks the heading).
- Every interactive ARIA control must be **keyboard operable**.
- Never put `aria-hidden="true"` or `role="presentation"` on a focusable element.
- Every interactive element needs an **accessible name**.

ARIA *is* the right tool for widgets with no native equivalent (tabs, combobox, tree), dynamic states like `aria-expanded`, live regions, and linking labels and descriptions.
