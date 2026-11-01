---
title: What is the difference between lab and field performance data?
category: performance
level: mid
tags: [web-vitals]
sources:
  - title: Why lab and field data can be different – web.dev
    url: https://web.dev/articles/lab-and-field-data-differences
---

**Lab data** is collected in a **controlled, simulated environment**: one device profile, one network setting, one page load (Lighthouse, Chrome DevTools, WebPageTest). **Field data** comes from **real users** on their real devices and networks (CrUX, RUM tools, the `web-vitals` library).

Lab data:

- **Reproducible**, available before deploy, great for **debugging** and CI checks.
- Doesn't reflect real devices, caches, logged-in states or user behavior.
- A page-load test has no real interactions, so it can't measure INP. It uses **Total Blocking Time** as a proxy.

Field data:

- Shows **what users actually experience**, reported as the **75th percentile**.
- **CrUX** (Chrome UX Report) is Google's public field dataset. It covers only Chrome users, needs enough traffic and uses a **28-day rolling window**, so fixes show up slowly.
- **RUM** (your own real user monitoring) gives faster feedback and lets you segment by page, device or release.

Why they disagree: real users have slower phones, warm or cold caches, different screen sizes (a different LCP element) and interact with the page. A green Lighthouse score does not guarantee passing Core Web Vitals. Use **field data to find problems** and **lab tools to diagnose** them.
