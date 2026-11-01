---
title: Why should you keep state minimal and compute everything else from it?
category: state-and-data
level: junior
tags: [state, rendering]
sources:
  - title: Choosing the State Structure – React docs
    url: https://react.dev/learn/choosing-the-state-structure
---

Store only the **minimal data that can't be computed**, and **derive** the rest during render. Every extra piece of state is another **source of truth** that you must keep in sync, and sooner or later one copy gets out of date.

A typical example is storing a **copy of an object** instead of its id:

```tsx
// fragile: selectedItem is a copy, editing items[i] won't update it
const [selectedItem, setSelectedItem] = useState<Item | null>(null)

// minimal: store the id, derive the object
const [selectedId, setSelectedId] = useState<string | null>(null)
const selectedItem = items.find((i) => i.id === selectedId)
const total = items.reduce((sum, i) => sum + i.price, 0)
```

Questions to ask before adding state:

- Can it be **computed** from props or other state (totals, counts, filtered lists, `isValid`)?
- Is it a **duplicate** of data that already exists somewhere else?
- Do two state variables always change together? Then they may belong in one.

If a derived value is expensive to compute, **memoize** it instead of storing it.
