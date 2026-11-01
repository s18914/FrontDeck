---
title: Why must React component names start with a capital letter?
category: react
level: junior
tags: [rendering]
sources: []
---

Because JSX uses the case of the tag to decide what it is: **lowercase tags are HTML elements** and become strings (`'div'`), while **capitalised tags are components** and are passed as a variable reference.

```tsx
<button />   // jsx('button', …)  -> a DOM <button>
<Button />   // jsx(Button, …)    -> calls your Button component
```

If you name a component `button` or `myCard`, React tries to create an unknown HTML element and your function is never called.

Related rules:

- Define components at the **top level** of a module, never inside another component. A component defined inside is a new function on every render, so React treats it as a **different type** and remounts it, losing its state.
- When a component comes from a variable, assign it to a capitalised name first: `const Icon = icons[type]` then `<Icon />`.
