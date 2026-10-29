---
title: How do you test UI that updates asynchronously with findBy and waitFor?
category: testing
level: mid
tags: [async, dom]
sources:
  - title: Async Methods – Testing Library
    url: https://testing-library.com/docs/dom-testing-library/api-async/
---

Use **`findBy*`** to wait for an element to **appear**, and **`waitFor`** to wait until **any assertion** passes. Both retry until success or a timeout (1 second by default), so the test waits for the UI instead of guessing with `setTimeout`.

```tsx
render(<UserProfile id="1" />)
expect(await screen.findByRole('heading', { name: 'Ann' })).toBeInTheDocument()

await user.click(screen.getByRole('button', { name: 'Save' }))
await waitFor(() => expect(onSave).toHaveBeenCalledWith({ name: 'Ann' }))

await waitForElementToBeRemoved(() => screen.queryByText('Loading…'))
```

Common mistakes:

- **Forgetting `await`** — the test finishes before the UI updates and passes or fails randomly.
- Using `waitFor(() => screen.getByText(...))` when **`findByText`** does the same more simply.
- **Side effects inside `waitFor`** (clicking, typing) — the callback can run many times, so keep only assertions in it.
- Many assertions in one `waitFor` — put **one** there and do the rest after it.
- Using `findBy` for elements that are already there — `getBy` is clearer.
