---
title: What are template literal types, and what are practical uses for them?
category: typescript
level: senior
tags: [generics, utility-types]
sources:
  - title: Template Literal Types – TypeScript docs
    url: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
---

Template literal types use **JavaScript template string syntax at the type level** to build string literal types. When a placeholder is a union, the result is the **cross product** of all combinations.

```ts
type Size = 'sm' | 'md' | 'lg'
type Side = 'top' | 'bottom'
type Spacing = `m${Capitalize<Side>}-${Size}`
// 'mTop-sm' | 'mTop-md' | … 6 members

type EventName<T extends string> = `on${Capitalize<T>}`
type Handler = EventName<'click' | 'focus'> // 'onClick' | 'onFocus'

type CssVar = `--${string}`
const ok: CssVar = '--brand-color'
const bad: CssVar = 'brand-color' // error
```

They come with intrinsic helpers: **`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`**.

Practical uses:

- **Pattern-constrained strings** — `` `/${string}` `` for paths, `` `#${string}` `` for hex colors, `` `${number}px` `` for CSS lengths.
- **Derived key names** in mapped types — `onChange` handlers or `getX` getters generated from a model.
- **Parsing strings with `infer`** — e.g. extracting `id` from `'/users/:id'` to type route params. Typed routers use exactly this.

Pitfalls:

- Unions multiply quickly. Several unions of 10+ members in one template can produce **thousands of members** and slow the compiler noticeably (there is a hard limit of about 100,000).
- They only check the **shape of a string**, not its meaning: `` `#${string}` `` accepts `'#nope'`. For real validation you still need a runtime check.
