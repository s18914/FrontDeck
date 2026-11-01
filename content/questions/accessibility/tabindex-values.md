---
title: What do tabindex values of 0, -1 and a positive number do?
category: accessibility
level: junior
tags: [dom, events]
sources: []
---

`tabindex` controls whether an element **can receive focus** and whether it is **in the Tab sequence**.

- **`tabindex="0"`** — makes an element focusable and puts it in the **natural Tab order**, based on its position in the DOM. Used for custom widgets, though a native element is usually the better choice.
- **`tabindex="-1"`** — focusable **only from code** (`el.focus()`), skipped by Tab. Typical uses: focusing a heading after a route change, a dialog container or an error summary; also "roving tabindex" in tabs and toolbars.
- **Positive values** (`1`, `2`…) — jump ahead of everything else in the Tab order. **Avoid them**: the order stops matching the visual layout and becomes impossible to maintain.

Native interactive elements (`<button>`, `<a href>`, `<input>`) are already focusable, so don't add `tabindex="0"` to them. Since focus order follows the **DOM order**, fix ordering problems in the markup rather than with tabindex or CSS reordering.
