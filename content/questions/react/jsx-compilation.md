---
title: What is JSX and what does it compile to?
category: react
level: junior
tags: [rendering]
sources:
  - title: Writing Markup with JSX – React docs
    url: https://react.dev/learn/writing-markup-with-jsx
---

JSX is a **syntax extension that lets you write HTML-like markup inside JavaScript**. Browsers cannot run it, so a compiler (SWC, Babel, TypeScript) turns every tag into a **plain function call that returns an object** describing the element.

```tsx
const el = <h1 className="title">Hi {name}</h1>

// compiles (automatic runtime) to roughly:
import { jsxs as _jsxs } from 'react/jsx-runtime'
const el = _jsxs('h1', { className: 'title', children: ['Hi ', name] })
```

The compiler uses `jsx` for a single child and `jsxs` when there are several static children.

Key points:

- The result is a **React element**, a lightweight object, not a DOM node.
- Since React 17 the **automatic JSX runtime** is used, so you no longer need `import React` in every file. Older setups compiled to `React.createElement`.
- Curly braces `{}` embed any **JavaScript expression** (not statements like `if` or `for`).
- Because it is JavaScript, JSX can be stored in variables, passed as props and returned from functions.
