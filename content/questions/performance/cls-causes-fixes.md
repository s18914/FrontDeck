---
title: What causes Cumulative Layout Shift and how do you fix it?
category: performance
level: mid
tags: [web-vitals, css-layout]
sources:
  - title: Optimize Cumulative Layout Shift – web.dev
    url: https://web.dev/articles/optimize-cls
---

CLS measures **unexpected movement** of visible content. It sums the shifts in the worst **burst** of layout shifts during the page's life. Good is **≤ 0.1**. Shifts that happen right after a user input (for example expanding an accordion on click) are not counted.

Main causes and fixes:

- **Images and videos without dimensions** — set `width` and `height` attributes or `aspect-ratio`, so the browser reserves space before the file loads.
- **Ads, embeds, iframes** — reserve space with a fixed `min-height` container, even if the ad doesn't fill.
- **Content injected above existing content** — banners, cookie notices, "load more" results inserted at the top. Insert below the viewport, use overlays, or reserve the space up front.
- **Web fonts** — the fallback and web font have different metrics, so text reflows on swap. Use `font-display: optional`, or match the fallback with `size-adjust` and related descriptors.
- **Animating layout properties** like `top`, `height` or `margin` — animate **`transform`** and `opacity` instead.
- **Client-side rendered skeletons** whose size doesn't match the real content.

```css
.ad-slot { min-height: 250px; }
.thumb { aspect-ratio: 16 / 9; width: 100%; }
```
