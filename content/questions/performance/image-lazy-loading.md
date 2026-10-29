---
title: How do you lazy-load images natively, and which images should not be lazy-loaded?
category: performance
level: junior
tags: [web-vitals, semantic-html]
sources:
  - title: Browser-level image lazy loading for the web – web.dev
    url: https://web.dev/articles/browser-level-image-lazy-loading
---

Add **`loading="lazy"`** to an `<img>` (or `<iframe>`). The browser then **delays downloading** the image until it is close to the viewport, which saves bandwidth and frees the network for more important resources.

```html
<img src="/gallery/photo-12.webp" alt="Mountain lake at sunrise"
     width="800" height="600" loading="lazy" />
```

What not to lazy-load:

- **Above-the-fold images**, and especially the **LCP image** (the hero image or main product photo). Lazy-loading it delays its download and makes **LCP worse**. Load it eagerly and consider `fetchpriority="high"`.

Good practice:

- Always set **`width` and `height`** (or CSS `aspect-ratio`), so the space is reserved and the image doesn't cause layout shift when it appears.
- No JavaScript library or Intersection Observer is needed for basic lazy loading anymore.
