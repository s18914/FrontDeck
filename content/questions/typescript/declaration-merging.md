---
title: What is declaration merging and module augmentation, and when do you need them?
category: typescript
level: senior
tags: [modules, objects]
sources:
  - title: Declaration Merging – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
---

**Declaration merging** means the compiler combines several declarations with the same name into one definition. The most common case is **interfaces**: two `interface User` declarations merge their members. **Module augmentation** uses this to **add types to a third-party module or the global scope** without editing its source.

```ts
// types/next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: { id: string; role: 'admin' | 'user' }
  }
}

// global augmentation, from any module file
declare global {
  interface Window { analytics?: { track(event: string): void } }
}
export {}
```

Typical real-world needs:

- Adding fields to a **library's interface** that was designed for it (auth session, theme objects in styling libraries, router metadata).
- Typing **globals** injected by scripts (`window.dataLayer`).
- Extending **environment variable** types (`ProcessEnv`) or test matcher types.

Rules and pitfalls:

- **Interfaces, namespaces and enums** merge (namespaces can also merge into functions and classes). A **`type` alias** with the same name is a duplicate identifier error — this is the main practical difference between `type` and `interface`.
- `declare module 'x'` inside a file **without imports or exports** declares a new ambient module that **replaces** the library's types instead of augmenting them. That is why augmentation files usually have an `import` or `export {}`.
- You can **add** members but not change the type of an existing one; conflicting property types are an error.
- The file must be **included by `tsconfig`**, otherwise the augmentation silently does nothing.

The downside of merging is that it happens globally and implicitly, so keep augmentations in one clearly named `types/` folder.
