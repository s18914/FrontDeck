---
title: What does it mean to test behavior instead of implementation details?
category: testing
level: junior
tags: [dom, component-patterns]
sources:
  - title: Guiding Principles – Testing Library
    url: https://testing-library.com/docs/guiding-principles/
---

It means a test should check **what the user sees and does** — rendered text, roles, labels, the result of clicking — and not **how the component achieves it** internally. This is the core idea behind React Testing Library.

**Implementation details** are things the user can't observe: state variable names, which hook is used, internal methods, CSS class names, the number of child components.

Why it matters:

- **Fewer false negatives** — refactoring `useState` to `useReducer` shouldn't break tests when the app still works.
- **Fewer false positives** — a test that checks internal state can pass while the button is actually broken.

What to test in a component: rendering for different props, **user interactions** and their results, **loading, error and empty states**, and callbacks (e.g. `onSubmit` called with the right data). Skip testing third-party libraries, styles and trivial markup.
