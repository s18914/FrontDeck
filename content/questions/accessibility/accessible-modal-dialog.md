---
title: How do you build an accessible modal dialog?
category: accessibility
level: mid
tags: [aria, dom]
sources:
  - title: Dialog (Modal) Pattern – ARIA APG
    url: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
  - title: HTML dialog element – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
---

An accessible modal **moves focus into itself** when it opens, **keeps focus inside** while open, **closes on Escape**, makes the background **inert**, has an **accessible name**, and **returns focus** to the trigger when it closes. The simplest way to get this is the native **`<dialog>` opened with `showModal()`**.

```tsx
function DeleteButton() {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button onClick={() => ref.current?.showModal()}>Delete</button>
      <dialog ref={ref} aria-labelledby="delete-title">
        <h2 id="delete-title">Delete this item?</h2>
        <form method="dialog"><button>Cancel</button></form>
      </dialog>
    </>
  )
}
```

What `showModal()` gives you:

- Renders in the **top layer** with a `::backdrop` — no z-index fights.
- Makes the rest of the page **inert**: not clickable, not focusable, hidden from screen readers.
- **Escape** closes it, focus moves inside on open, and returns to the previously focused element on close.

A **custom** modal (a `div` in a portal) needs all of this by hand: `role="dialog"` with `aria-modal="true"`, a focus trap, an Escape handler, `inert` on the rest of the app, scroll locking, and saving `document.activeElement` to restore later. Libraries such as Radix or React Aria handle it well. Note that `dialog.show()` opens a **non-modal** dialog without any of the trapping or inertness.
