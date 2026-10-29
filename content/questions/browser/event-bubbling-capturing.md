---
title: What are event bubbling and event capturing?
category: browser
level: junior
tags: [events, dom]
sources:
  - title: Event bubbling – MDN
    url: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling
---

They are the two directions in which a DOM event travels. In **capturing**, the event goes **down** from `window` to the target element; in **bubbling**, it goes back **up** from the target to `window`.

The full path has three phases:

1. **Capture phase** — from the root down to the target's parent.
2. **Target phase** — listeners on the element itself.
3. **Bubble phase** — from the target's parent back up to the root.

By default `addEventListener` listens in the **bubble phase**. Pass `{ capture: true }` (or `true`) to listen during capturing instead.

```ts
parent.addEventListener('click', onClick)                    // bubbling
parent.addEventListener('click', onClick, { capture: true }) // capturing
```

Bubbling is why a click on a `<span>` inside a `<button>` also fires the button's listener, and it is what makes **event delegation** possible. A few events, like `focus` and `blur`, **don't bubble**; use `focusin` and `focusout` if you need that.
