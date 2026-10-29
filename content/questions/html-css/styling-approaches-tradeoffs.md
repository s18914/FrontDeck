---
title: What are the trade-offs between CSS Modules, CSS-in-JS and Tailwind in a Next.js app?
category: html-css
level: mid
tags: [styling, server-components]
sources:
  - title: CSS-in-JS – Next.js docs
    url: https://nextjs.org/docs/app/guides/css-in-js
---

All three solve **style scoping**, but they differ in **when CSS is generated**. CSS Modules and Tailwind produce static CSS **at build time**; classic CSS-in-JS libraries generate styles **at runtime in JavaScript**, which doesn't fit Server Components.

- **CSS Modules** (`Button.module.css`) — plain CSS with **class names hashed per file**. Zero runtime, works in Server Components. Downsides: dynamic styles need class toggling or CSS variables, and styles live in a separate file.
- **Tailwind CSS** — **utility classes** in the markup (`flex gap-4 p-2`). Zero runtime, only used classes are shipped, and design tokens keep spacing and colours consistent. Downsides: long class strings and a learning curve.
- **Runtime CSS-in-JS** (styled-components, Emotion) — styles colocated in components and driven by props. Downsides: runtime cost to **inject styles**, extra JavaScript, and in the App Router they only work in **Client Components** with a style registry for SSR.

The key point for Next.js 16: **Server Components can't use runtime CSS-in-JS**, because they don't run in the browser and can't use React context. If you like that authoring style, pick a **zero-runtime** library that extracts CSS at build time (vanilla-extract, Panda CSS, StyleX).

New Next.js projects mostly use **Tailwind** or **CSS Modules**.
