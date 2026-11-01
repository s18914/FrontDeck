---
title: How much vertical space is there between the two paragraphs, and why?
category: html-css
level: mid
tags: [css-layout, output-prediction]
sources: []
---

```html
<section>
  <p class="first">First</p>
  <p class="second">Second</p>
</section>
```

```css
p { margin: 0; }
.first { margin-bottom: 30px; }
.second { margin-top: 20px; }
```

<!-- answer -->

The gap is **30px**, not 50px. Vertical margins of adjacent block elements **collapse** into one margin equal to the **larger of the two**.

When margins collapse:

- Between **adjacent siblings** in normal block flow (this case).
- Between a **parent and its first or last child**, when nothing separates them: no border, padding, inline content or clearance. The child's margin then "leaks" out of the parent.
- Through an **empty block** whose top and bottom margins touch.

With a negative margin involved, the result is the largest positive margin **plus** the most negative one.

When they **don't** collapse:

- **Horizontal** margins never collapse.
- Inside **flex and grid** containers: if `section` had `display: flex; flex-direction: column`, the gap would be **50px**.
- Floated and absolutely positioned elements.
- A parent that creates a new **block formatting context** (e.g. `display: flow-root`) doesn't collapse with its children.

This is one reason many teams use `gap` in flex/grid layouts, or only `margin-bottom`, for vertical spacing.
