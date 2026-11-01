---
title: Which array methods mutate the original array and which return a new one?
category: javascript
level: junior
tags: [objects]
sources:
  - title: Array.prototype.toSorted() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
---

**Mutating** methods change the array in place: `push`, `pop`, `shift`, `unshift`, `splice`, **`sort`**, **`reverse`**, `fill`. **Non-mutating** methods return a new array: `map`, `filter`, `slice`, `concat`, `flat`, and the newer **`toSorted`, `toReversed`, `toSpliced`** and `with`.

Why it matters:

- In React, state must not be mutated. `items.sort()` on a state array changes the existing array, so React may not see an update and other code sharing that array is affected.
- `sort` and `reverse` are easy to miss because they also **return** the array, which makes them look non-mutating.

```ts
const sorted = items.toSorted((a, b) => a.price - b.price)
const updated = items.with(2, newItem) // replace index 2
```

Before the `to*` methods existed, the usual pattern was to copy first: `[...items].sort()`.
