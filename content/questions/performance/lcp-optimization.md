---
title: What does LCP measure and how do you improve it?
category: performance
level: mid
tags: [web-vitals]
sources:
  - title: Optimize Largest Contentful Paint – web.dev
    url: https://web.dev/articles/optimize-lcp
---

**Largest Contentful Paint** measures when the **largest image or text block in the viewport** is rendered, counted from the start of navigation. It approximates "when does the main content appear". Good is **≤ 2.5 s** at the 75th percentile.

Candidates are images, video posters, CSS background images and block-level text. The useful way to debug it is to split LCP into **four parts** and fix the biggest one:

1. **Time to First Byte** — slow server, no CDN, redirects. Fix with caching, CDN, static or streamed rendering.
2. **Resource load delay** — the browser discovers the LCP image late (set from JavaScript, CSS background, lazy-loaded). Put it in the HTML as `<img>`, **never lazy-load it**, add **`fetchpriority="high"`** or preload it.
3. **Resource load duration** — the file is too big. Use **AVIF/WebP**, correct dimensions with `srcset`, compression, a CDN.
4. **Element render delay** — the resource is ready but rendering is blocked by **render-blocking CSS/JS**, a client-side render that waits for JavaScript, or a font for text LCP.

A common anti-pattern is a hero rendered only on the client after a data fetch. Putting it **in the initial HTML** often helps more than any image tweak.
