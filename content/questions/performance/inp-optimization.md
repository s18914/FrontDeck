---
title: What does INP measure and how do you improve it?
category: performance
level: mid
tags: [web-vitals, event-loop]
sources:
  - title: Interaction to Next Paint (INP) – web.dev
    url: https://web.dev/articles/inp
---

**Interaction to Next Paint** measures how long it takes from a **click, tap or key press** until the browser **paints the next frame** showing a response. It observes interactions during the whole visit and reports roughly the **worst one**. Good is **≤ 200 ms**. INP replaced FID, which only measured the delay of the first interaction.

Each interaction has three phases, and each has its own fixes:

- **Input delay** — the main thread is busy with something else (a long task, hydration, a third-party script). Break up long tasks and defer non-critical work.
- **Processing duration** — your event handlers are slow. Do the minimum needed for visual feedback first and **yield** before the rest. In React, mark non-urgent updates with `startTransition` and avoid re-rendering large trees on each keystroke.
- **Presentation delay** — rendering the result is expensive: a huge DOM, big re-layouts, forced synchronous layout. Keep the DOM small, virtualize long lists, use `content-visibility`.

Scrolling and hovering don't count. Since INP depends on real interactions and devices, you need **field data** to see it. A Lighthouse page-load audit can't measure it and uses **Total Blocking Time** as a lab proxy.
