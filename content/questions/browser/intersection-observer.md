---
title: What is IntersectionObserver and how would you use it for infinite scroll?
category: browser
level: mid
tags: [dom, events]
sources:
  - title: Intersection Observer API – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
---

`IntersectionObserver` tells you **asynchronously when an element enters or leaves the viewport** (or another scroll container). It replaces listening to `scroll` and calling `getBoundingClientRect()`, which runs on every scroll and forces layout.

For **infinite scroll**, put an empty **sentinel** element after the list and load the next page when it becomes visible:

```ts
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) loadNextPage()
  },
  { rootMargin: '200px' } // start loading a bit before it's visible
)
observer.observe(sentinel)
// later: observer.disconnect()
```

Useful options:

- **`root`** — the scroll container (default: the viewport).
- **`rootMargin`** — grows or shrinks the root box, great for **preloading**.
- **`threshold`** — what fraction must be visible, e.g. `0.5` for "half on screen".

Other common uses: **lazy-loading** images or components, tracking ad or section visibility, starting animations when a section appears. For plain images, the native `loading="lazy"` attribute is simpler. In React, create the observer in an **Effect** and call `disconnect()` in the cleanup.
