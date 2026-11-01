---
title: Why should you prefer userEvent over fireEvent in React Testing Library?
category: testing
level: junior
tags: [events, forms]
sources:
  - title: user-event introduction – Testing Library
    url: https://testing-library.com/docs/user-event/intro/
---

**`fireEvent`** dispatches **a single DOM event**. **`userEvent`** simulates a **full user interaction**, with every event a real browser would fire, so the test is closer to what users actually do.

For example, `fireEvent.change(input, …)` just sets the value. `user.type(input, 'abc')` focuses the input and fires `keydown`, `input` and `keyup` for **each character**. `user.click()` fires pointer and mouse events and moves focus. userEvent also **refuses to interact** with disabled or hidden elements, catching bugs that `fireEvent` would miss.

```tsx
const user = userEvent.setup()
render(<LoginForm />)
await user.type(screen.getByLabelText('Email'), 'ann@example.com')
await user.click(screen.getByRole('button', { name: 'Log in' }))
```

In v14 every method is **async** — always `await` it — and you create an instance with `userEvent.setup()` before rendering. Use `fireEvent` only for events userEvent doesn't cover.
