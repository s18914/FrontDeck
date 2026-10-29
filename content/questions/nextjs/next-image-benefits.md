---
title: What does the next/image component do better than a plain img tag?
category: nextjs
level: junior
tags: [web-vitals]
sources:
  - title: Image Optimization – Next.js docs
    url: https://nextjs.org/docs/app/getting-started/images
---

`next/image` extends `<img>` with **automatic optimization**:

- **Resizing**: it generates a `srcset`, so each device downloads an image close to the size it displays.
- **Modern formats**: images are served as WebP (or AVIF if configured), based on what the browser accepts.
- **Lazy loading by default**: off-screen images load only when they get close to the viewport.
- **No layout shift**: `width`/`height` (or `fill` inside a sized parent) reserve space, which protects **CLS**.
- **Placeholders**: `placeholder="blur"` shows a blurred preview; static imports get width, height and blur data automatically.

```tsx
import Image from 'next/image'
import hero from './hero.jpg'

<Image src={hero} alt="Team at work" placeholder="blur" loading="eager" />
```

Pitfalls: `alt` is required; remote images must be allowed in `images.remotePatterns`; the hero (LCP) image should **not** be lazy, so use `loading="eager"` or `fetchPriority="high"`. The old `priority` prop is deprecated in Next.js 16.
