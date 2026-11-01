---
title: What is dynamic import() and when would you use it?
category: javascript
level: mid
tags: [modules, bundling]
sources:
  - title: import() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
---

`import('./module')` **loads a module at runtime** and returns a **promise** that resolves to the module object. Unlike a static `import` at the top of the file, it can be called **conditionally or on demand**.

```ts
button.addEventListener('click', async () => {
  const { exportToPdf } = await import('./pdf-export')
  exportToPdf(report)
})
```

Why it matters:

- Bundlers treat every dynamic import as a **split point** and put that module in a **separate chunk**. This is the basis of **code splitting**: code that is not needed on first load is not downloaded on first load.
- Good candidates are **heavy libraries** (charts, editors, PDF tools), rarely used features and admin sections.
- `React.lazy` and `next/dynamic` are built on top of it.

Trade-offs: the user waits for a network request the first time the feature is used, so show a loading state and consider **prefetching** likely-needed chunks. Keep the import path a **static string** — bundlers cannot reliably split fully dynamic paths.
