---
title: How does HTTP response compression with gzip or Brotli work?
category: networking
level: junior
tags: [http]
sources:
  - title: Compression in HTTP – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression
---

The browser announces which algorithms it supports in the **`Accept-Encoding`** request header (e.g. `gzip, br, zstd`). The server picks one, compresses the body and labels it with **`Content-Encoding: br`**. The browser decompresses it transparently — your JavaScript never sees the difference.

Key points:

- It works best on **text**: HTML, CSS, JS, JSON and SVG often shrink by 70–90%.
- **Brotli (`br`)** usually compresses text better than gzip, so it is the preferred choice for static assets.
- **Don't compress already compressed files** like JPEG, PNG, WebP, MP4 or WOFF2 — it wastes CPU for almost no gain.
- Static assets can be **pre-compressed at build time** with maximum settings; dynamic responses are compressed on the fly with faster settings.

Caches should get **`Vary: Accept-Encoding`** so they don't serve a Brotli response to a client that can't decode it.
