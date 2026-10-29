---
title: What does Next.js add on top of plain React?
category: nextjs
level: junior
tags: [rendering, routing]
sources: []
---

React is a **UI library**: it renders components but leaves routing, data fetching, rendering strategy and build tooling to you. Next.js is a **full-stack React framework** that makes those decisions and wires them together.

What you get out of the box:

- **File-based routing** in the `app` directory, with nested layouts, loading and error states.
- **Server rendering**: React Server Components by default, prerendering at build time or rendering per request, and streaming.
- **Data fetching and caching** in Server Components, plus APIs to revalidate cached data.
- **Backend pieces**: Server Actions for mutations, Route Handlers for HTTP endpoints, and Proxy for request-level logic.
- **Built-in optimizations**: `next/image`, `next/font`, metadata for SEO, automatic code splitting per route.
- **Tooling**: the Turbopack bundler, TypeScript support and `.env` handling.

In short, React answers "how do I build components", while Next.js answers "how do I ship a fast, SEO-friendly app made of them".
