---
title: What does TypeScript add on top of JavaScript, and what happens to the types at runtime?
category: typescript
level: junior
tags: [bundling]
sources:
  - title: The Basics – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/basic-types.html
---

TypeScript is JavaScript plus a **static type system**. It checks your code **at compile time** and then the types are **erased** — the output is plain JavaScript with no type information left.

What you gain:

- **Errors before running the code** — typos in property names, calling something that may be `undefined`, passing the wrong argument.
- **Better editor tooling** — autocomplete, safe renames, go-to-definition.
- **Types as documentation** — a function signature tells you what it expects and returns.

What it does **not** do:

- No runtime checks. Data from an API, `JSON.parse` or a form is only as safe as you validate it (e.g. with Zod).
- Many tools (Vite, esbuild, SWC) only **strip types without checking them**, so you still run `tsc --noEmit` in CI.
