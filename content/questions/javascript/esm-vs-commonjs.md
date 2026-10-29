---
title: What is the difference between ES modules and CommonJS?
category: javascript
level: mid
tags: [modules]
sources:
  - title: JavaScript modules – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
---

**ES modules** (`import`/`export`) are the **standard module system** of the language, supported by browsers and Node. **CommonJS** (`require`/`module.exports`) is the older Node.js format.

Key differences:

- **Static structure:** ESM imports and exports are known **before the code runs**. This enables **tree shaking** — bundlers can remove unused exports. `require` can be called anywhere with any expression, so it cannot be analyzed as reliably.
- **Loading:** CommonJS loads **synchronously**; ESM is designed for **asynchronous** loading and supports **top-level `await`**.
- **Bindings:** ESM imports are **live bindings** to the exported variable; CommonJS gives you a **copy** of `module.exports` at the time of the call.
- **Strict mode** is on by default in ESM.
- In ESM, `this` at the top level is `undefined`, and `__dirname` / `require` are not available.

In modern frontend projects you write **ESM**. CommonJS still appears in older Node packages and config files, which is why tools support both and why mixing them sometimes causes "require is not defined" or default-export interop issues.
