---
title: What should you mock in frontend tests, and what are the risks of over-mocking?
category: testing
level: mid
tags: [mocking]
sources:
  - title: Mocking – Vitest
    url: https://vitest.dev/guide/mocking
---

Mock the **boundaries you don't control** or that make tests slow and non-deterministic: the **network**, **time**, randomness, and browser APIs missing in jsdom. Keep **your own code real** as much as possible.

Vitest tools:

- **`vi.fn()`** — a fake function, e.g. an `onSubmit` prop, to assert it was called with the right arguments.
- **`vi.spyOn(obj, 'method')`** — watch (and optionally replace) an existing method, e.g. `console.error` or `Math.random`.
- **`vi.mock('./module')`** — replace a whole module. It is **hoisted** to the top of the file.
- **`vi.useFakeTimers()`** — control `setTimeout` and dates.

Risks of over-mocking:

- Tests **pass while the real integration is broken** — the mock returns a shape the real API no longer sends.
- Tests become coupled to **implementation details** (which module calls which), so refactors break them.
- Mocks **leak between tests** unless you restore them (`vi.restoreAllMocks()` or the `restoreMocks` config option).

Prefer mocking at the **network level with MSW** over mocking your own `api.ts` module.
