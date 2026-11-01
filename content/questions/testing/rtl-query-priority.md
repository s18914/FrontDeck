---
title: Why does React Testing Library recommend getByRole as the first-choice query?
category: testing
level: mid
tags: [dom, aria]
sources:
  - title: About Queries – Testing Library
    url: https://testing-library.com/docs/queries/about/
---

Because `getByRole` finds elements the way **users and assistive technologies** do — by their **role and accessible name**. A test that uses it fails when the UI becomes inaccessible, so it **checks accessibility for free** and survives markup refactors.

The recommended priority:

1. **Accessible to everyone** — `getByRole`, `getByLabelText` (form fields), `getByPlaceholderText`, `getByText`, `getByDisplayValue`.
2. **Semantic** — `getByAltText`, `getByTitle`.
3. **Test IDs** — `getByTestId`, only when nothing else works (e.g. a chart canvas).

```tsx
// fragile, says nothing about the user experience
container.querySelector('.btn-primary')
// robust and checks the accessible name
screen.getByRole('button', { name: /save changes/i })
```

Pitfalls:

- If `getByRole('button')` can't find your clickable `<div>`, that's **a real bug** — use a `<button>`.
- Use the **`name` option** to pick one element among many with the same role.
- `getByRole` is slower on very large DOMs, but correctness is usually worth it.
