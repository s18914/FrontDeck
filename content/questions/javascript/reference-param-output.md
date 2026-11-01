---
title: What is logged after a function mutates an object argument and then reassigns the parameter?
category: javascript
level: junior
tags: [objects, output-prediction]
sources: []
---

```ts
function update(obj) {
  obj.x = 2
  obj = { x: 3 }
}

const o = { x: 1 }
update(o)
console.log(o.x)
```

<!-- answer -->

```ts
2
```

JavaScript always passes arguments **by value** — but for objects, the value is a **reference**. So `obj` and `o` start out pointing at the same object.

- `obj.x = 2` **mutates the shared object**, so the change is visible through `o`.
- `obj = { x: 3 }` only **reassigns the local parameter** to a new object. `o` still points at the original one, which now has `x: 2`.

This distinction ("mutating vs reassigning") is exactly why mutating props or state objects in React is dangerous: the mutation leaks to every place holding that reference, while React cannot detect it because the reference itself did not change.
