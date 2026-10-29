---
title: How do you analyze and reduce a JavaScript bundle that has grown too large?
category: performance
level: senior
tags: [bundling, modules]
sources: []
---

First **measure what is in the bundle and what actually runs**, then remove, replace or defer the biggest offenders. JavaScript is costly beyond download time: it must be **parsed, compiled and executed** on the main thread, which hurts both LCP and INP on slow phones.

Analysis tools:

- A **bundle visualizer** (webpack-bundle-analyzer, rollup-plugin-visualizer, or the framework's analyzer) shows a treemap of each chunk. Look at the **compressed** size and at which routes include which modules.
- The **DevTools Coverage** panel shows how much of the downloaded JS is **unused** on a given page.
- Package size checks (for example bundlephobia) **before** adding a dependency.

Typical findings and fixes:

- **One huge dependency** (date, chart, icon or utility libraries) → replace with a lighter one or native APIs (`Intl`, `structuredClone`), or import specific paths.
- **Tree shaking not working** → CommonJS packages, barrel files, missing `sideEffects` flag.
- **Duplicated packages** in several versions → dedupe in the lockfile.
- **Code for one page loaded everywhere**, like a global provider importing an editor → move it to the route or **lazy-load** it on interaction.
- **Polyfills and transpilation** for old browsers you don't support → update the browserslist targets.
- In the App Router, logic that doesn't need interactivity can stay in **Server Components**, so its dependencies never reach the client.

Then **lock in the result** with a size budget in CI, because bundles grow back quietly one dependency at a time.
