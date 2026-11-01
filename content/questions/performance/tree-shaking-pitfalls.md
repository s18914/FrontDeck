---
title: What can prevent tree shaking from removing unused code?
category: performance
level: mid
tags: [bundling, modules]
sources:
  - title: Tree shaking – MDN
    url: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
---

Tree shaking is the bundler removing exports that are **never imported**. It relies on **static ES module** `import`/`export` and on knowing that dropping a module is **safe** (has no side effects). Anything that breaks either assumption keeps dead code in the bundle.

Common causes:

- **CommonJS** — `require` and `module.exports` are dynamic, so the bundler can't reliably tell what is used. Prefer libraries that ship ESM, and don't let a compiler transform your ESM to CommonJS.
- **Side effects** — top-level code that runs on import (polyfills, global CSS, registering plugins) must be kept. Without `"sideEffects": false` (or a list of files) in `package.json`, bundlers have to assume every module may have side effects.
- **Barrel files** — an `index.ts` that re-exports a whole library. If any re-exported module has side effects or the bundler can't analyze it, importing one function **pulls in much more**. Barrels also slow down builds and dev servers.
- **Importing a whole namespace and using it dynamically**, like `utils[name]`.
- **Classes and objects with many methods** — unused methods on a class can't be removed individually.

```ts
import { debounce } from 'lodash'          // CommonJS, can include the whole library
import debounce from 'lodash-es/debounce'  // ESM, only what you use
```

Always **verify with a bundle analyzer** — tree shaking fails silently.
