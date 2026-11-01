---
title: How do you keep Playwright end-to-end tests from being flaky?
category: testing
level: mid
tags: [async, dom]
sources:
  - title: Best Practices – Playwright
    url: https://playwright.dev/docs/best-practices
---

Playwright runs your **real app in real browsers** (Chromium, Firefox, WebKit), so it's ideal for a small set of **critical user flows** — sign-up, login, checkout. A **flaky test** passes and fails randomly without code changes, usually because of **timing, shared state or unstable selectors**.

How to avoid flakiness:

- **Never use fixed sleeps** (`waitForTimeout`). Actions **auto-wait** until an element is visible, stable and enabled, and **web-first assertions retry** until they pass.
- Use **user-facing locators** like `getByRole` and `getByLabel` instead of CSS classes or XPath.
- **Isolate tests** — each gets a fresh browser context; create its own data and don't depend on test order. Reuse login via `storageState` instead of sharing a logged-in session.
- **Mock third-party services** you don't control with `page.route()`.
- Treat retries as a diagnostic, not a fix — record a **trace on first retry** and investigate.

```ts
await page.getByRole('button', { name: 'Place order' }).click()
await expect(page.getByText('Order confirmed')).toBeVisible()
```
