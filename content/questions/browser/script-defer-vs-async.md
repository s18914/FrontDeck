---
title: What is the difference between a regular script, a defer script, an async script and a module script?
category: browser
level: mid
tags: [rendering, modules]
sources:
  - title: <script> element – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script
---

They differ in **whether they block HTML parsing** and **when they run**. A regular script blocks parsing; `defer` and `async` download in parallel, but `defer` runs after parsing in order, while `async` runs as soon as it arrives.

- **`<script src>`** — parsing **stops** until the script is downloaded and executed. That's why old advice was to put scripts at the end of `<body>`.
- **`defer`** — downloads in parallel, runs **after the document is parsed**, just before `DOMContentLoaded`, and **in document order**. Good for app code that needs the DOM.
- **`async`** — downloads in parallel and runs **as soon as it's ready**, possibly in the middle of parsing and in **any order**. Good for independent scripts like analytics.
- **`type="module"`** — **deferred by default**, also supports `import`, runs in strict mode with its own scope. Adding `async` makes it run as soon as it and its imports are ready.

```html
<script src="/app.js" defer></script>
<script src="https://analytics.example/a.js" async></script>
<script type="module" src="/main.js"></script>
```

`defer` and `async` only work on **external** scripts (`src`); they are ignored on inline classic scripts. In Next.js you usually don't write these tags yourself: the framework loads its bundles, and `next/script` offers loading strategies for third-party scripts.
