---
title: What is automatic batching of state updates in React?
category: react
level: mid
tags: [state, rendering]
sources:
  - title: Queueing a Series of State Updates – React docs
    url: https://react.dev/learn/queueing-a-series-of-state-updates
---

Batching means React **groups several state updates into a single re-render**. Since React 18 this happens **automatically everywhere**: in event handlers, promises, `setTimeout`, native listeners and async functions.

```tsx
async function handleSave() {
  const data = await save()
  setSaving(false)
  setResult(data)
  setToast('Saved')   // one render for all three
}
```

Why it matters:

- **Performance**: fewer renders.
- **Consistency**: the UI never shows a half-updated state, like `saving` false but no `result` yet.

Details:

- Before React 18 only updates inside React event handlers were batched; updates after an `await` or in a timeout rendered one by one.
- React waits until the current code finishes, then processes the queue in order.
- Batching does not cross separate user events: two clicks are handled as two renders.
- In rare cases where you must read the DOM right after an update (for example scrolling to a new item), `flushSync` from `react-dom` forces a synchronous update. Use it sparingly, it hurts performance.
