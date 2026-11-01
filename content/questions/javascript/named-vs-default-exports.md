---
title: What is the difference between named and default exports?
category: javascript
level: junior
tags: [modules]
sources: []
---

A module can have **many named exports** but **only one default export**. Named exports are imported **by their exact name in braces**, while a default export can be imported **under any name**.

```ts
// utils.ts
export function formatDate() {}
export default function Button() {}

// app.ts
import Button, { formatDate } from './utils'
import AnyName from './utils' // also works – same default export
```

Why many teams prefer named exports:

- **Consistent names** across the codebase, which makes search and refactoring easier.
- Better **autocomplete** and automatic imports in editors.
- Typos fail at build time instead of silently importing the wrong thing.

Where default exports are required: some frameworks expect them. For example, Next.js **`page.tsx` and `layout.tsx` must default-export** the component, and `React.lazy` expects a module with a default export.
