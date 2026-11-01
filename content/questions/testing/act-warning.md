---
title: What causes the "not wrapped in act" warning in React tests, and how do you fix it?
category: testing
level: mid
tags: [async, side-effects]
sources: []
---

The warning means **React state updated while the test wasn't waiting for it**. Usually some **async work** (a fetch in an effect, a timer, a resolved promise) finished **after your assertions**, or even after the test ended.

`act()` tells React to finish all pending updates and effects before the test continues. **React Testing Library already wraps** `render`, `userEvent` and its async utilities (`findBy`, `waitFor`) in `act`, so in practice the warning points to a **missing wait**, not a missing `act`.

```tsx
render(<Profile />) // starts a fetch in useEffect
expect(screen.getByText('Loading…')).toBeInTheDocument()
// if the test ended here, the fetch would resolve later -> warning
// fix: wait for the final state too
expect(await screen.findByText('Ann')).toBeInTheDocument()
```

Typical fixes:

- **`await` the final UI state** with `findBy` or `waitFor`.
- **`await` every `userEvent` call**.
- With **fake timers**, advance them inside `act` (or configure userEvent with `advanceTimers`).

Avoid wrapping random lines in `act` just to silence the warning — the test might be asserting on a state the user never ends up in.
