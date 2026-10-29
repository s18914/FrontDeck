---
title: What does calling sort() without a compare function return for an array of numbers?
category: javascript
level: junior
tags: [objects, output-prediction]
sources:
  - title: Array.prototype.sort() – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
---

```ts
const nums = [10, 1, 5, 100]
console.log(nums.sort())
```

<!-- answer -->

```ts
[1, 10, 100, 5]
```

Without a compare function, `sort()` **converts elements to strings and compares them by UTF-16 code units**. As strings, `'100'` comes before `'5'` because `'1'` is smaller than `'5'`.

The fix is to pass a compare function:

```ts
nums.sort((a, b) => a - b) // [1, 5, 10, 100]
```

Two more things interviewers expect you to mention:

- `sort()` **mutates the original array** (and returns the same reference). Use `toSorted()` when you need a new array, e.g. for React state.
- The same string comparison makes `['b', 'a', 'C'].sort()` return `['C', 'a', 'b']`, because uppercase letters come before lowercase ones. For human-friendly ordering use `localeCompare`.
