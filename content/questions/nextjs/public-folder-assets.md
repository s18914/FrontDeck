---
title: What is the public folder used for in a Next.js project?
category: nextjs
level: junior
tags: [bundling]
sources: []
---

Files in `public/` are served **as-is from the root URL**: `public/logo.svg` is available at `/logo.svg`. It's meant for static assets that need a **stable, predictable URL**, such as `robots.txt`, downloadable files, or images referenced by path.

```tsx
<Image src="/logo.svg" alt="FrontDeck" width={120} height={32} />
```

Things to know:

- Don't include `public` in the URL. The path starts after it.
- Files are **not processed by the bundler** and get no content hash, so Next.js can't safely cache them forever. Changing a file under the same name is how you update it.
- Only files that exist at **build time** are served; files added at runtime won't appear.
- A file must not have the same path as a route.
- For images used inside components, a **static import** (`import hero from './hero.jpg'`) is often better: it gets a hashed URL plus automatic width, height and blur placeholder.
