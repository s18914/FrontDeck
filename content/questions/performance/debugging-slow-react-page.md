---
title: How would you debug a React page that feels slow?
category: performance
level: senior
tags: [rendering, web-vitals]
sources:
  - title: React Performance tracks – React docs
    url: https://react.dev/reference/dev-tools/react-performance-tracks
  - title: Analyze runtime performance – Chrome for Developers
    url: https://developer.chrome.com/docs/devtools/performance
---

Don't guess and sprinkle memoization. **Reproduce, measure, find the bottleneck, fix one thing, measure again.** First decide what "slow" means: slow initial load (LCP), slow interactions (INP), janky scrolling, or slowness that grows over time (memory leak).

A workflow:

1. **Reproduce in realistic conditions** — a production build (development mode is much slower and misleading), **CPU throttling** to mimic a mid-range phone, realistic data volume.
2. **Record in the Chrome DevTools Performance panel** while doing the slow action. Look for **long tasks** and what fills them: scripting, style and layout, paint. The **React Performance tracks** show which components rendered and how long React's work took inside each task.
3. **Check the Network panel too** — a slow page is often waiting on a request waterfall, a large bundle or an unoptimized image, not on React. Then use the **React DevTools Profiler** to see which commits are expensive and which components render in them.
4. **Match the fix to the cause**:
   - unnecessary re-renders → move state down, split contexts, narrow store selectors, memoize where measurement shows a gain;
   - expensive render logic → memoize the calculation or move it to the server;
   - too many DOM nodes → **virtualize** lists, paginate;
   - layout thrashing → batch DOM reads and writes;
   - heavy JS on load → code splitting, fewer dependencies, Server Components;
   - urgent updates blocked by heavy ones → `startTransition` or deferred values.
5. **Verify** with the same recording and, after release, with **field data** (INP, LCP from RUM).

Mentioning that you check the production build and field data, not only the local dev experience, is what separates a senior answer.
