---
title: What is Turbopack and what changed about it in Next.js 16?
category: nextjs
level: junior
tags: [bundling]
sources:
  - title: Turbopack – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/turbopack
---

Turbopack is the **Rust-based, incremental bundler** built into Next.js, the successor to Webpack. In **Next.js 16 it is stable and the default** for both `next dev` and `next build`, so the old `--turbopack` flag is no longer needed.

Why it matters:

- **Faster dev server startup and Fast Refresh**, because work is computed incrementally and cached, including on disk between restarts.
- **Faster production builds**.

Practical consequences:

- A custom `webpack()` function in `next.config` is **not used** by Turbopack. `next build` fails if it finds one, so you either migrate to the top-level `turbopack` options (such as `resolveAlias`) or opt out with `next build --webpack`.
- Some Webpack-specific tricks, like the `~` prefix in Sass imports, aren't supported.

The short interview answer: "Rust bundler, incremental, the default since v16; Webpack is still available behind a flag."
