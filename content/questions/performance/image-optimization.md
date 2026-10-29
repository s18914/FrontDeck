---
title: What does optimizing images for web performance involve?
category: performance
level: mid
tags: [web-vitals, http]
sources:
  - title: Choose the right image format – web.dev
    url: https://web.dev/articles/choose-the-right-image-format
---

Images are usually the **heaviest bytes on a page** and often the **LCP element**. Optimizing them means sending the **right format**, at the **right size**, with the **right priority** — and reserving their space in the layout.

- **Format** — **AVIF** or **WebP** for photos (much smaller than JPEG at similar quality), **SVG** for icons and logos, PNG only when you need lossless raster. Use `<picture>` with `<source type>` so browsers without AVIF support fall back.
- **Compression** — choose a sensible quality level (often around 70–80) instead of exporting at 100. Strip metadata.
- **Dimensions** — don't scale a 3000 px photo down in CSS. Generate several widths and let the browser choose with `srcset` and `sizes`.
- **Priority** — the LCP image should be in the initial HTML, **not lazy-loaded**, with `fetchpriority="high"`. Offscreen images get `loading="lazy"`.
- **Layout** — set `width`/`height` or `aspect-ratio` to avoid **CLS**.
- **Delivery** — an **image CDN** can resize, convert formats and cache at the edge automatically. Serve images with long cache lifetimes.

```html
<picture>
  <source type="image/avif" srcset="/hero.avif" />
  <img src="/hero.jpg" alt="Product on a desk" width="1200" height="675"
       fetchpriority="high" />
</picture>
```

Also question whether a decorative image is needed at all — a CSS gradient or a much smaller file is often enough.
