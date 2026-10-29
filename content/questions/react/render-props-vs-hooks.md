---
title: When would you still use a render prop instead of a custom hook?
category: react
level: senior
tags: [component-patterns, hooks]
sources:
  - title: Reusing Logic with Custom Hooks – React docs
    url: https://react.dev/learn/reusing-logic-with-custom-hooks
---

Custom hooks are the default for **sharing stateful logic**: they compose, add nothing to the component tree and avoid nesting. A render prop, meaning a prop that is a function returning JSX, is still the better choice when a component must **render something itself and let the consumer fill in part of the output** with data it provides.

The comparison:

- **Render prop**: `<MouseTracker>{pos => <Cursor {...pos} />}</MouseTracker>`. The logic lives in a component in the tree. Several of them nest into a pyramid, and the inline function is new on every render.
- **Hook**: `const pos = useMouse()`. Flat, easy to combine with other hooks, and simpler to type.

Cases where a render prop is still the right tool:

- **Slots that receive data from the component**: `renderItem` in a virtualized list, `renderCell` in a table, `<Controller render>` in React Hook Form. The component owns layout and iteration, and the consumer owns how each item looks.
- **Behavior scoped to a subtree**: the logic needs its own DOM element and ref, a context provider, or a Suspense or error boundary around what it renders. A hook cannot wrap JSX.
- **Per-item logic in a list**: you cannot call a hook inside `items.map`, but you can render a component with a render prop for each item.

Rule of thumb: **logic only, use a hook**. Logic tied to rendering structure, or needed per item, use a component, often with a render prop or `children` as a function. Many libraries expose both: a hook as the core and a render-prop component as a convenience built on top of it.
