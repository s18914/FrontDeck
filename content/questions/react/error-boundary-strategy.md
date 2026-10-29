---
title: How would you design an error boundary strategy for a large React app?
category: react
level: senior
tags: [error-handling, component-patterns]
sources:
  - title: Component – React docs
    url: https://react.dev/reference/react/Component
---

Use **layered boundaries** placed wherever a failure should be isolated: a root boundary as the last resort, one per **route or layout**, and granular ones around **independent widgets**, so one crashing chart does not blank the whole page. Combine them with explicit handling for the errors boundaries do not catch.

The layers:

- **Root**: a full-page "Something went wrong" with a reload button, and reporting to monitoring.
- **Route or section**: keeps navigation and layout alive. Next.js does this per route segment with `error.tsx`.
- **Widget**: an inline fallback with a retry button, for feeds, charts or third-party embeds. Place it at the same level as the matching Suspense boundary, so loading and error states cover the same region.

Design decisions:

- **Recovery.** Offer a retry that resets the boundary, and reset it automatically when the relevant input changes, for example by giving it a `key` based on the route. Otherwise it stays in the error state after navigation.
- **Reporting.** Log in `componentDidCatch`, or centrally with the `onCaughtError` and `onUncaughtError` options of `createRoot`, including the component stack.
- **Gaps.** Boundaries do not catch errors in event handlers or async callbacks. Handle those with `try`/`catch` and state. Errors thrown in Actions and rejected promises read with `use()` **do** reach boundaries.
- **Expected vs unexpected.** Validation errors, 404s and permission errors are normal UI states, so render them, do not throw them. Boundaries are for bugs and outages.

Only class components can be boundaries, so most teams use the `react-error-boundary` package instead of writing classes by hand.
