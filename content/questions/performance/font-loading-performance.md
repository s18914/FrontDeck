---
title: How do you load web fonts without hurting performance?
category: performance
level: mid
tags: [web-vitals, styling]
sources:
  - title: Best practices for fonts – web.dev
    url: https://web.dev/articles/font-best-practices
---

Fonts can delay text rendering (hurting **FCP/LCP**) and cause **layout shift** when the fallback font is swapped for the web font. The fixes are: load fewer, smaller fonts, discover them early, and control what happens while they load.

- **`font-display`** sets the behavior while the font is loading. `swap` shows fallback text immediately and swaps later (text visible fast, possible shift). `optional` uses the web font only if it arrives almost instantly, otherwise keeps the fallback (**no shift**).
- **Preload** the one or two critical fonts so the browser doesn't wait for the CSS to discover them. The `crossorigin` attribute is required even for same-origin fonts.
- Use **WOFF2**, **subset** to the characters you need, and prefer **variable fonts** over many separate weights.
- **Self-host** fonts to avoid an extra connection to a third-party origin.
- Reduce the swap shift with a **metric-matched fallback** using `size-adjust`, `ascent-override` and related `@font-face` descriptors.

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
```
