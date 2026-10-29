---
title: How should focus and announcements be handled after a client-side route change?
category: accessibility
level: mid
tags: [routing, dom]
sources:
  - title: Accessibility – Next.js docs
    url: https://nextjs.org/docs/architecture/accessibility
---

On a full page load, the browser resets focus to the top and screen readers announce the new title. A client-side navigation **only swaps part of the DOM**, so the user may get **no signal** that the page changed, and focus may stay on the old link or fall back to `body`. You need to restore both: **announce** the new page and put **focus** somewhere sensible.

Common approaches:

- **Announce** the new page through a visually hidden live region. Next.js does this by default with its **route announcer**, which reads `document.title`, then the first `<h1>`, then the URL — so give every page a **unique title** via metadata.
- **Move focus** to the new page's `<h1>` or `<main>` (with `tabIndex={-1}`), so the next Tab continues from the new content instead of the navigation.
- Provide a **skip link** ("Skip to main content") as the first focusable element.
- Don't move focus for in-page updates such as filters or sorting; a short live-region message ("12 results") is enough there.
Test with a keyboard and a screen reader: after activating a link you should hear the new page name, and the next Tab should land in the new content.
