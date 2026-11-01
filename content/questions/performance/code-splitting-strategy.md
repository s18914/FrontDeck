---
title: How do you decide between route-level and component-level code splitting?
category: performance
level: mid
tags: [bundling, modules]
sources: []
---

**Route-level splitting** is the baseline: each page gets its own chunk, so users download only the code for the page they visit. Frameworks like the Next.js App Router do this automatically. **Component-level splitting** is a targeted extra step for **heavy code that is not needed for the first render**.

Good candidates for component-level splitting (`import()` with `React.lazy` and `Suspense`):

- Code behind an interaction: **modals, drawers**, emoji pickers, "export to PDF".
- **Heavy libraries** used in one place: charts, rich text or code editors, maps.
- Content far **below the fold** or in rarely opened tabs.
- Features only some users get: admin tools, feature-flagged experiments.

When **not** to split:

- Small components. Each chunk adds a request and a **loading state**, so the overhead can outweigh the savings.
- Anything visible on first paint. Lazy-loading it delays content and can **hurt LCP or cause layout shift**.
- Chains of lazy components that load one after another, creating a **request waterfall**.

To hide the delay, **prefetch on intent** (hover or focus on the button that opens the modal), and give the fallback the same size as the final content. Measure with a bundle analyzer rather than splitting by feel.
