---
title: What does the viewport meta tag do and why is it needed?
category: html-css
level: junior
tags: [semantic-html, css-layout]
sources: []
---

The viewport meta tag tells mobile browsers to make the **layout viewport as wide as the device screen**. Without it, phones render the page at a fake desktop width (around 980px) and **zoom out**, so text is tiny and media queries don't match.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- **`width=device-width`** — the layout width equals the screen width in CSS pixels, so a 390px-wide phone really gets 390px and your `min-width: 768px` query behaves as expected.
- **`initial-scale=1`** — start at 100% zoom.

Pitfalls:

- Don't add **`user-scalable=no`** or **`maximum-scale=1`**. Blocking zoom hurts users who need to enlarge text, and it's an accessibility failure.
- It belongs in the `<head>`, once per page.

In Next.js App Router you don't write this tag yourself: Next.js adds a default viewport tag, and you customise it with the **`viewport` export** (or `generateViewport`) from a layout or page.
