---
title: How do third-party scripts affect performance, and how do you limit their impact?
category: performance
level: senior
tags: [web-vitals, bundling, http]
sources: []
---

Analytics, tag managers, chat widgets, A/B testing tools, ads and embeds run **on your main thread** and often load further scripts you don't control. They can block rendering, compete for bandwidth, create long tasks that **hurt INP**, and inject content that causes **layout shift**.

How they hurt:

- **Synchronous loading** in the `<head>` blocks parsing and rendering (worst case: A/B tools that hide the page until they run).
- Extra **DNS/TLS connections** to many origins.
- **Long tasks** from heavy SDKs during load and interactions.
- **Unreserved space** for ads and widgets → CLS.
- No control over updates: a vendor release can regress your site overnight.

Mitigations:

- **Audit regularly** — Lighthouse's third-party summary, the DevTools Network panel grouped by domain. Remove scripts nobody uses.
- Load with **`async` or `defer`**, and delay non-critical ones until after load, idle time or **user interaction** or consent.
- Use **facades**: show a static preview of a YouTube player or chat button and load the real widget on click.
- **Preconnect** to the few critical third-party origins.
- **Self-host** small static scripts where licensing allows, so they share your connection and cache policy.
- **Reserve space** for ads and embeds.
- Consider moving some scripts to a **web worker** (for example with Partytown), knowing not every script supports it.
- Put **governance** around tag managers: each new tag needs an owner and a performance budget.

Measure the business value against the cost. Sometimes the best optimization is removing the script.
