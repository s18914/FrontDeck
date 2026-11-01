---
title: What does a promise chain log when an error is thrown in the middle and caught later?
category: javascript
level: mid
tags: [async, error-handling, output-prediction]
sources: []
---

```ts
Promise.resolve(1)
  .then(() => {
    throw new Error('boom')
  })
  .then(() => console.log('skipped'))
  .catch((err) => {
    console.log('caught', err.message)
    return 2
  })
  .then((value) => console.log('after', value))
  .finally(() => console.log('done'))
```

<!-- answer -->

```ts
caught boom
after 2
done
```

- Throwing inside `.then` **rejects** the promise returned by that `.then`.
- A rejection **skips every `.then`** until it reaches a `.catch`, so `skipped` is never logged.
- `.catch` **handles the error and recovers the chain**: its return value `2` becomes a normal fulfilled value.
- The next `.then` therefore runs with `2`.
- `.finally` runs at the end regardless of success or failure. It receives **no arguments** and normally passes the previous value through unchanged.

If `.catch` rethrew the error instead of returning a value, `after` would be skipped, `done` would still be logged, and the rejection would end up unhandled.
