---
title: How does prototypal inheritance work in JavaScript?
category: javascript
level: mid
tags: [objects]
sources:
  - title: Inheritance and the prototype chain – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
---

Every object has a hidden link to another object called its **prototype**. When you read a property that the object does not have, JavaScript **looks it up along the prototype chain** — the prototype, then its prototype, and so on until it reaches `null`.

```ts
const animal = { speak() { return 'sound' } }
const dog = Object.create(animal)

dog.speak()                              // 'sound' – found on the prototype
Object.getPrototypeOf(dog) === animal    // true
```

Key points:

- **Methods live on the prototype and are shared** by all instances, which saves memory. `[].map` works because arrays inherit from `Array.prototype`.
- **Writing** a property always creates it on the object itself; it does not modify the prototype. This is called **shadowing**.
- `class` and `extends` are built on top of this same mechanism.
- Use `Object.getPrototypeOf` / `Object.create` rather than the legacy `__proto__` accessor.

Avoid modifying built-in prototypes (`Array.prototype.myFn = …`) — it affects every array in the app and can clash with future language features.
