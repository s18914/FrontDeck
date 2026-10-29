---
title: What are render-blocking resources and how do you reduce their impact?
category: performance
level: mid
tags: [rendering, bundling]
sources: []
---

Render-blocking resources are files the browser must download and process **before it can paint anything**. By default these are **stylesheets in the `<head>`** and **synchronous scripts** (without `defer`, `async` or `type="module"`), which also pause HTML parsing. They directly delay **FCP and LCP**.

How to reduce the impact:

- **Scripts** — add `defer` (runs in order after parsing) or `async` (runs as soon as it loads, order not guaranteed, good for independent scripts like analytics). Module scripts are deferred by default.
- **Critical CSS** — inline the small amount of CSS needed for above-the-fold content and load the rest without blocking.
- **Media queries on `<link>`** — a stylesheet with a non-matching `media` (for example `print`) is still downloaded but **doesn't block rendering**.
- **Remove unused CSS and JS** and split large bundles, so less has to load before the first paint.
- Avoid **`@import`** in CSS, which creates a chain of sequential requests.
- Keep third-party scripts out of the `<head>` or load them with `async`/`defer`.

```html
<script src="/app.js" defer></script>
<link rel="stylesheet" href="/print.css" media="print" />
```

Lighthouse lists render-blocking resources, and the DevTools Network panel shows which requests are **render-blocking**.
