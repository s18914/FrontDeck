---
title: What is the difference between unit, integration and end-to-end tests?
category: testing
level: junior
tags: [mocking, dom]
sources: []
---

They differ in **how much of the system runs for real**. A **unit test** checks one small piece in isolation, an **integration test** checks several pieces working together, and an **end-to-end (E2E) test** drives the **whole running app in a real browser**, like a user would.

Frontend examples:

- **Unit** — a `formatPrice()` helper or a reducer. Fast and precise.
- **Integration** — render a `<CheckoutForm>` with its child components, type into fields, submit, and check the success message, with the network mocked (e.g. MSW). Tools: Vitest + React Testing Library.
- **E2E** — Playwright opens the real app, logs in, adds a product to the cart and pays, against a real or staging backend.

The trade-off: going up the list gives **more confidence** that the app works, but tests get **slower, costlier to maintain and more prone to flakiness**. A healthy suite mixes all three.
