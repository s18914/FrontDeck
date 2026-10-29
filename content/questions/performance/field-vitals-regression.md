---
title: How would you investigate a Core Web Vitals regression that only shows up in field data?
category: performance
level: senior
tags: [web-vitals]
sources:
  - title: Debug performance in the field – web.dev
    url: https://web.dev/articles/debug-performance-in-the-field
---

Field data tells you **that** users have a problem, but not **why**. The approach is to narrow the regression down by **segment and time**, collect **attribution data** from real users, and only then reproduce it in the lab.

Steps:

1. **Confirm and scope it** — which metric, which pages or templates, mobile or desktop, which countries or connection types. A drop in one segment often points straight at the cause.
2. **Correlate with changes** — deploys, feature flags, new third-party tags, CMS content (a new, heavier hero image changes LCP without any code change). CrUX uses a **28-day window**, so its timeline lags. Your own RUM data shows changes per day or per release.
3. **Collect attribution** — the `web-vitals` library's **attribution build** reports *what* caused the value: the LCP element and its sub-parts (TTFB, load delay, load time, render delay), the INP interaction target and which phase was slow, the element that shifted for CLS. Send it to your analytics along with the metric.
4. **Reproduce in the lab** with the same conditions — device throttling, the specific page and interaction, logged-in state, cold cache — and profile it in DevTools.
5. **Fix and verify** in RUM first, then wait for CrUX to catch up.

Common surprises: the lab LCP element differs from the field one (different viewport), INP comes from a single slow interaction on one page, or a regression is caused by **traffic mix** (more users on slow devices) rather than code.
