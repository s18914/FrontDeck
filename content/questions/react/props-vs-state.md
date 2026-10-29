---
title: What is the difference between props and state?
category: react
level: junior
tags: [state]
sources: []
---

**Props** are data passed **into** a component by its parent and are read-only. **State** is data a component **owns and manages itself**, and changing it triggers a re-render.

- **Props** are set by the parent and configure the component, like function arguments. The component cannot change them.
- **State** is set by the component through its setter and remembers things that change over time, like user input or an open/closed flag.

How they connect:

- One component's state often becomes another component's props: a parent keeps `const [open, setOpen] = useState(false)` and passes `open` down.
- To let a child change parent state, the parent passes a **callback prop** like `onToggle`.

A common mistake is **copying props into state** (`useState(props.value)`). The state is only initialised once, so it ignores later prop changes. Use the prop directly or compute from it.
