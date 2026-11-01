---
title: How can you reset a component's state when a prop changes?
category: react
level: mid
tags: [state, rendering]
sources:
  - title: Preserving and Resetting State – React docs
    url: https://react.dev/learn/preserving-and-resetting-state
---

Give the component a **`key` derived from that prop**. When the key changes, React treats it as a **different component**: it unmounts the old instance and mounts a fresh one with initial state, including all its children.

```tsx
function ContactPage({ contactId }: { contactId: string }) {
  return <EditContactForm key={contactId} contactId={contactId} />
}
```

Without the key, switching from contact A to contact B renders `EditContactForm` at the **same position with the same type**, so React keeps its state and the half-typed draft of A shows up for B.

Why this beats the alternative:

- The usual mistake is an effect: `useEffect(() => setDraft(''), [contactId])`. It renders once with stale state, then again after reset, and you must remember to reset **every** piece of state, including in children.
- A key resets **everything** in one declarative step.

Keys are not only for lists; any element can have one. The same trick **separates state between branches** that render the same component in the same spot: `isAdmin ? <Panel key="admin" /> : <Panel key="user" />`.

The trade-off is a full remount, so DOM nodes and effects are recreated. Never use `key={Math.random()}` — the component would remount on every render.
