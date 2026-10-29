---
title: Why does next/image require remotePatterns for external images, and how do you configure it?
category: nextjs
level: mid
tags: [http]
sources:
  - title: images – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/config/next-config-js/images
---

The image optimizer is an **endpoint on your server** (`/_next/image?url=...&w=...&q=...`) that downloads, resizes and re-encodes images. If it accepted any URL, anyone could use **your server and bandwidth to process arbitrary images**, which means abuse, cost spikes and even server-side request forgery. So remote images are **blocked unless their URL matches an allow-list**.

```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com', pathname: '/decks/**' },
      new URL('https://avatars.githubusercontent.com/u/**'),
    ],
  },
}
```

Tips:

- Be **as specific as possible**: protocol, hostname and ideally `pathname` (`**` matches any depth, `*` one segment). On shared hosts like a public storage bucket, lock it to your own path.
- `images.domains` is **deprecated** because it can't restrict protocol or path.
- Next.js 16 tightened defaults: at most **3 redirects**, local IP addresses blocked, only quality **75** allowed unless you list others in `images.qualities`, and local images with query strings need `localPatterns`.
- If a source doesn't need optimization (SVG icons, an image CDN that already optimizes), use the `unoptimized` prop or a custom `loader`.
