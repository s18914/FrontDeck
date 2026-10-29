---
title: What is list virtualization and when do you need it?
category: performance
level: junior
tags: [rendering, dom]
sources: []
---

Virtualization (windowing) means rendering **only the rows currently visible** in the scroll area, plus a few extra (**overscan**), instead of the whole list. As the user scrolls, rows are recycled, so the DOM stays small even for 10,000 items.

When you need it: long lists or tables with **hundreds or thousands of rows**, where rendering everything makes the first render slow, uses a lot of memory and makes scrolling and interactions laggy. Common libraries are **TanStack Virtual** and **react-window**.

Trade-offs:

- Off-screen rows are not in the DOM, so **browser find (Ctrl+F)** and some screen reader navigation don't see them.
- **Variable row heights** are harder and need measuring.
- Scroll position restoration needs extra work.

For moderately long lists, pagination or CSS **`content-visibility: auto`** may be a simpler alternative.
