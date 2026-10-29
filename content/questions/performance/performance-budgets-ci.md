---
title: How do you set performance budgets and enforce them in CI?
category: performance
level: senior
tags: [web-vitals, bundling]
sources: []
---

A performance budget is a set of **limits the team agrees not to exceed**, checked automatically so regressions are caught **in the pull request**, not by users weeks later. Budgets turn "performance matters" into a failing build.

Types of budgets:

- **Quantity-based** — JavaScript size per route (compressed), total image weight, number of requests, third-party script count. Easy to measure and **stable**, so they make the best hard CI gates.
- **Timing-based** — LCP, TBT, CLS in a lab run. Closer to user experience but **noisy**.
- **Rule-based** — a minimum Lighthouse performance score.

How to set them: start from the **current baseline** or a competitor's numbers, aim for Core Web Vitals "good" thresholds, and remember that a cheap phone on a slow network sets the real limit.

Enforcing in CI:

- **Bundle size checks** (size-limit or a bundler's size reports) that fail when a route's JS grows over the limit and comment the diff on the PR.
- **Lighthouse CI** with assertions against a preview deployment, using **several runs and the median** to reduce noise.
- Use **warnings** for small regressions and **errors** for clear breaches, so the gate doesn't get ignored.

CI only sees lab data. Add **field monitoring**: RUM with the `web-vitals` library or CrUX, dashboards by page and device, and **alerts** when the 75th percentile crosses a threshold.

Budgets need ownership. Someone must decide when a new feature may raise a budget and what gets removed in exchange, otherwise limits just get bumped every time they fail.
