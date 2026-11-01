---
title: When would you choose flexbox and when CSS Grid?
category: html-css
level: mid
tags: [css-layout]
sources: []
---

Use **flexbox for one-dimensional** layouts, where items flow in a row **or** a column and their size comes from the content. Use **Grid for two-dimensional** layouts, where you control rows **and** columns at the same time and items must line up in both directions.

A helpful way to think about it:

- **Flexbox is content-out** — items decide their size and the container distributes leftover space. Great for navbars, toolbars, button groups, centering, a row of tags that wraps.
- **Grid is layout-in** — the container defines the tracks and items are placed into them. Great for page layouts, card galleries, forms with aligned labels, dashboards.

The typical tell: if you wrap flex items and then fight to make the cards on the second row **line up with the first**, you want Grid. Wrapped flex lines are independent; grid columns are shared.

They work well **together**: a Grid page layout with flex inside each card. Both support `gap` and the same alignment properties.

**Subgrid** (`grid-template-rows: subgrid`) lets nested elements align to the parent grid, e.g. titles and buttons lining up across a row of cards.
