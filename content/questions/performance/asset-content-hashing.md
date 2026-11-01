---
title: Why do build tools add content hashes to static asset filenames?
category: performance
level: mid
tags: [caching, bundling]
sources: []
---

A content hash (`main.3f9a1c.js`) is derived from the file's contents, so the **filename changes only when the content changes**. That lets you cache assets **"forever"** in browsers and CDNs, while users still get updates immediately after a deploy.

How the pieces fit together:

- Hashed files (JS, CSS, fonts, images) are served with a **very long cache lifetime** and marked **immutable**. Repeat visits load them from the cache without any network request.
- The **HTML is not cached long-term** (or is revalidated), so after a deploy it references the **new filenames**. Changed files are fetched, unchanged ones stay cached.
- Without hashing you'd need a short cache lifetime or query-string versioning, and users could get **old JS with new HTML**.

Performance details:

- Good **chunk splitting** keeps hashes stable. If vendor code is in its own chunk, changing your app code doesn't invalidate the vendor cache.
- A change in one module can change the hash of chunks that import it, so watch for cascading invalidations.
- Old files should stay available for a while after a deploy, because users with an open tab may still request old chunks.

Vite, webpack and Turbopack do this automatically in production builds.
