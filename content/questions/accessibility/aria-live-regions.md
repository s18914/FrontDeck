---
title: What are ARIA live regions and when do you use polite versus assertive?
category: accessibility
level: mid
tags: [aria, dom]
sources:
  - title: ARIA live regions – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions
---

A live region is an element whose **content changes are announced by screen readers without moving focus**. `aria-live="polite"` waits until the screen reader is idle; `aria-live="assertive"` interrupts right away, so keep it for urgent messages.

Typical uses: "Added to cart", the number of search results, "All changes saved", toast notifications, chat messages.

Roles with built-in live behavior:

- `role="status"` — polite, for status messages.
- `role="alert"` — assertive, for important errors.
- `role="log"` — polite, for chat or activity feeds.

```tsx
<div role="status">{saved ? 'All changes saved' : ''}</div>
```

Pitfalls:

- The region must **already be in the DOM** before its text changes. Mounting a new element together with its text is often not announced, so render the empty container up front and update its content.
- Keep messages short and avoid bursts of updates — they queue up or get dropped.
- `aria-atomic="true"` makes the whole region be read, not only the changed part.
- Overusing `assertive` is disruptive: it cuts off whatever the user is currently listening to.
- Live regions only announce. For dialogs and navigation, manage focus instead.
