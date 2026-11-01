---
title: What is a portal in React and when would you use one?
category: react
level: mid
tags: [dom, rendering]
sources:
  - title: createPortal – React docs
    url: https://react.dev/reference/react-dom/createPortal
---

A portal **renders children into a different DOM node** (often `document.body`) while they **stay in the same place in the React tree**.

```tsx
import { createPortal } from 'react-dom'

function Modal({ children }: { children: React.ReactNode }) {
  return createPortal(
    <div className="modal-backdrop">{children}</div>,
    document.body
  )
}
```

Why use it: modals, tooltips, dropdowns and toasts must escape a parent with `overflow: hidden`, a `transform` or a low **stacking context**, which would otherwise clip them or put them under other content.

What stays the same as a normal child:

- **Context** from React parents is still available.
- **Events bubble through the React tree**, not the DOM tree. A click inside the portal triggers `onClick` on the React parent even though the DOM node lives elsewhere.

Pitfalls:

- `document` doesn't exist during server rendering, so render the portal only on the client.
- Portals don't handle accessibility: you still manage focus, `Escape` and ARIA. For simple modals and popovers, the native **`<dialog>`** element and the **Popover API** render in the top layer and may remove the need for a portal.
