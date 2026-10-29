---
title: What does strict mode change in JavaScript?
category: javascript
level: mid
tags: [scope]
sources:
  - title: Strict mode – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
---

Strict mode is a stricter variant of JavaScript that **turns silent mistakes into errors** and removes some confusing features. It is enabled with `'use strict'` and is **on automatically in ES modules and class bodies** — so most modern code already runs in it.

The most important changes:

- **Assigning to an undeclared variable throws** a `ReferenceError` instead of creating an accidental global.
- **`this` is `undefined`** in a plain function call instead of the global object.
- Writing to a **read-only property** (e.g. on a frozen object) **throws** instead of failing silently.
- **Duplicate parameter names** and the `with` statement are syntax errors.
- Some reserved words (`let`, `static`, `implements`…) cannot be used as identifiers.

Why it matters in interviews: it explains many "why does this code behave differently" questions, especially the value of `this` in a detached method — `undefined` in a module, `globalThis` in an old-style script.
