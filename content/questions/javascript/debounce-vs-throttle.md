---
title: What is the difference between debouncing and throttling?
category: javascript
level: mid
tags: [events, functions]
sources: []
---

Both limit how often a function runs during a burst of events. **Debounce** waits until the events **stop** for a given time and then calls the function **once**. **Throttle** calls the function **at most once per interval** while the events keep firing.

When to use which:

- **Debounce** — when only the final value matters: **search-as-you-type** requests, auto-saving a form, validating input after the user stops typing.
- **Throttle** — when you need regular updates during continuous activity: **scroll** position, `mousemove`, resize-driven layout calculations, infinite scroll checks.

Example: with a 300 ms delay and a user typing for 2 seconds, a debounced search sends **one** request at the end, while a throttled one sends **about seven**.

Both are implemented with **timers and closures**: the closure keeps the timer ID or the last call time between invocations.

React pitfall: creating a debounced function directly in the component body makes a **new one on every render**, so the timer never accumulates. Keep it stable (e.g. in `useMemo` or `useRef`) and cancel it on unmount. For animations, `requestAnimationFrame` is often a better throttle than a fixed interval.
