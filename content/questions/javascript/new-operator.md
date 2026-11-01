---
title: What happens step by step when you call a function with the new keyword?
category: javascript
level: mid
tags: [objects, functions]
sources: []
---

`new` **creates a new object, links it to the constructor's prototype, runs the constructor with `this` pointing at that object, and returns it**.

Step by step for `new User('Ann')`:

1. A new empty object is created.
2. Its prototype is set to **`User.prototype`**, so it inherits the methods defined there.
3. `User` is called with **`this` bound to the new object**, so `this.name = name` sets properties on it.
4. The new object is returned — **unless the constructor explicitly returns another object**, which then replaces it. Returning a primitive is ignored.

```ts
function User(name) {
  this.name = name
}
User.prototype.greet = function () { return `Hi, ${this.name}` }

const ann = new User('Ann')
ann.greet() // 'Hi, Ann'
```

Common follow-ups: forgetting `new` with a constructor function makes `this` `undefined` in strict mode (or the global object in sloppy mode). Classes protect against this by throwing when called without `new`. Arrow functions cannot be used with `new` at all.
