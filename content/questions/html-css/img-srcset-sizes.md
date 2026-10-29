---
title: How do the srcset and sizes attributes on an img element work?
category: html-css
level: mid
tags: [semantic-html]
sources:
  - title: Responsive images – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images
---

**`srcset`** lists several versions of the same image with their widths, and **`sizes`** tells the browser **how wide the image will be displayed**. The browser combines that with the screen's pixel density and **picks the smallest file that looks sharp**.

```html
<img
  src="/photo-800.jpg"
  srcset="/photo-400.jpg 400w, /photo-800.jpg 800w, /photo-1600.jpg 1600w"
  sizes="(min-width: 1024px) 50vw, 100vw"
  alt="Team at the office"
  width="800"
  height="533"
/>
```

Here, on a 375px phone with a 2× screen, the image is shown at `100vw` = 375 CSS px, needing ~750 real pixels, so the browser picks `photo-800.jpg`.

Key points:

- **`w` descriptors** need `sizes`; without it the browser assumes `100vw` and may download too big a file.
- For fixed-size images (icons, avatars), use **`x` descriptors** instead: `srcset="a.png 1x, a@2x.png 2x"`.
- `src` is the **fallback** for old browsers.
- The browser chooses the file, so this is for **resolution switching**. To show a **different crop** per screen size (art direction) use `<picture>` with `<source media>`.
- Always add **`alt`** (empty `alt=""` for decorative images) and **`width`/`height`** to reserve space and avoid layout shift.

In Next.js, `next/image` generates `srcset` for you, but you still pass the `sizes` prop for responsive images.
