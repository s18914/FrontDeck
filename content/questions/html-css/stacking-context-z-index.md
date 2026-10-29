---
title: What is a stacking context and why does z-index sometimes not work?
category: html-css
level: mid
tags: [css-layout, rendering]
sources:
  - title: Stacking context – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context
---

A stacking context is a **group of elements that is layered as one unit**. `z-index` only orders elements **within the same stacking context**, so a child with `z-index: 9999` can never rise above an element that is above its parent's context.

Typical reasons `z-index` "doesn't work":

1. **The element isn't positioned** — `z-index` needs `position` other than `static`, or the element must be a flex or grid item.
2. **An ancestor creates a stacking context** with a lower order. The child is trapped inside it.

Things that create a stacking context:

- `position: relative | absolute` with a `z-index` other than `auto`; `fixed` and `sticky` always do
- `opacity` less than 1
- `transform`, `filter`, `perspective`, `clip-path`, `mask`
- `will-change` with one of those properties
- `isolation: isolate`
- `contain: paint` or `layout`

```css
.header { position: relative; z-index: 2; }
.page { transform: translateZ(0); } /* new context */
.page .modal { position: fixed; z-index: 9999; } /* still below .header */
```

Fixes: render modals and tooltips **outside** the trapped tree (a React **portal** to `body`, or the native `<dialog>` and popover **top layer**), or remove the property that creates the context. Use `isolation: isolate` deliberately to contain a component's z-indexes.
