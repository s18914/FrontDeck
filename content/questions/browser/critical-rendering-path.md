---
title: What steps does the browser go through to turn HTML and CSS into pixels on the screen?
category: browser
level: mid
tags: [rendering]
sources:
  - title: Critical rendering path – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path
---

This sequence is called the **critical rendering path**: the browser builds the **DOM** and **CSSOM**, combines them into a **render tree**, calculates **layout**, **paints** the pixels and **composites** the layers.

1. **DOM** — HTML is parsed into a tree of nodes. Parsing is incremental, but a classic `<script>` pauses it.
2. **CSSOM** — CSS is parsed into a tree of styles. CSS is **render-blocking**: the browser won't paint until it has the stylesheets in `<head>`.
3. **Render tree** — only visible nodes with their computed styles. Elements with `display: none` are left out; `visibility: hidden` ones stay in.
4. **Layout** (reflow) — the size and position of every box is calculated.
5. **Paint** — boxes are filled with pixels: text, colors, borders, shadows, images.
6. **Composite** — painted layers are put together in the right order, often on the GPU.

Why it matters: to get a **fast first render**, keep render-blocking CSS small, load scripts with `defer` or `async`, and avoid work that forces layout again. After the first render, any DOM or style change re-runs part of this pipeline.
